'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var del = require('del');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var exec = require('child_process').exec;
var fs = require('fs');

var notify = require('gulp-notify');

var buffer = require('vinyl-buffer');
var argv = require('yargs').argv;
// sass
var sass = require('gulp-sass');
var rubysass = require('gulp-ruby-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var sourcemaps = require('gulp-sourcemaps');
var scsslint = require('gulp-scss-lint');

// BrowserSync
var browserSync = require('browser-sync');
// js
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babel = require('babelify');
// image optimization
var imagemin = require('gulp-imagemin');
// linting
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
// testing/mocha
var mocha = require('gulp-mocha');

var handlebars = require('gulp-handlebars');
var path = require('path');
var merge = require('merge-stream');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

var compilehandlebars = require('gulp-compile-handlebars');
var styleguide = require('sc5-styleguide');

// gulp build --production
var production = !!argv.production;
// determine if we're doing a build
// and if so, bypass the livereload
var build = argv._.length ? argv._[0] === 'build' : false;
var watch = argv._.length ? argv._[0] === 'watch' : true;

// ----------------------------
// Error notification methods
// ----------------------------
var beep = function() {
  var os = require('os');
  var file = 'gulp/error.wav';
  if (os.platform() === 'linux') {
    // linux
    exec("aplay " + file);
  } else {
    // mac
    console.log("afplay " + file);
    exec("afplay " + file);
  }
};
var handleError = function(task) {
  return function(err) {
    beep();

      notify.onError({
        message: task + ' failed, check the logs..',
        sound: false
      })(err);

    gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err));
  };
};

var HBoptions = {
  ignorePartials: true,
  batch: ['templates'],
  helpers: {
    capitals: function(str){
      return str.toUpperCase();
    }
  }
};

// --------------------------
// CUSTOM TASK METHODS
// --------------------------
var tasks = {
  // --------------------------
  // Delete build folder
  // --------------------------
  clean: function(cb) {
    del(['public/'], cb);
    return gulp.src('node_modules/.gitignore')
      .pipe(gulp.dest('public/')
    );
  },
  // --------------------------
  // HTML
  // --------------------------
  // html templates (when using the connect server)
  templates: function() {
    return gulp.src('templates/*.{html,handlebars}')
      .pipe(compilehandlebars(JSON.parse(fs.readFileSync('./data/gulpdata.json')), HBoptions))
      .pipe(rename(function(path) {
          path.extname = '.html';
      }))
      .pipe(gulp.dest('public/'));
  },

  handlebars: function() {
    var partials = gulp.src(['templates/_*.handlebars'])
      .pipe(handlebars())
      .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
        imports: {
          processPartialName: function(fileName) {
            // Strip the extension and the underscore
            // Escape the output with JSON.stringify
            return JSON.stringify(path.basename(fileName, '.js').substr(1));
          }
        }
      }))
      .pipe(wrap('var Handlebars = require(\'handlebars\');<%= contents %>'));

    var templates = gulp.src('templates/**/[^_]*.handlebars')
      .pipe(handlebars())
      .pipe(wrap('Handlebars.template(<%= contents %>)'))
      .pipe(declare({
        root: 'Handlebars',
        namespace: 'templates',
        noRedeclare: true // Avoid duplicate declarations
      }));

    var merged = merge(partials, templates)
      .pipe(concat('templates.js'))
      .pipe(gulp.dest('source/'));

    // Output both the partials and the templates as build/js/templates.js
    return merged;
  },

  // --------------------------
  // SASS (libsass)
  // --------------------------
  sass: function() {
    return gulp.src('assets/scss/[^_]*.scss')
      //.pipe(scsslint())
      // sourcemaps + sass + error handling
      .pipe(gulpif(!production, sourcemaps.init()))
      .pipe(sass({
        sourceComments: !production,
        outputStyle: production ? 'compressed' : 'nested'
      }))
      .on('error', handleError('SASS'))
      // generate .maps
      .pipe(gulpif(!production, sourcemaps.write({
        'includeContent': false,
        'sourceRoot': '.'
      })))
      // autoprefixer
      .pipe(gulpif(!production, sourcemaps.init({
        'loadMaps': true
      })))
      .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
      // we don't serve the source files
      // so include scss content inside the sourcemaps
      .pipe(sourcemaps.write({
        'includeContent': true
      }))
      // write sourcemaps to a specific directory
      // give it a file and save
      .pipe(gulp.dest('public/css'));
  },
  // --------------------------
  // SASS (ruby-sass)
  // --------------------------
  rubysass: function() {
      return gulp.src('assets/scss/_old/*.scss')
      .pipe(rubysass({bundleExec: true}))
      .on('error', function (err) { console.log(err.message); })
      .pipe(gulp.dest('public/css'));
  },
  // --------------------------
  //
  // --------------------------
  styleguideGenerate: function(cb) {
    return gulp.src([
      'assets/scss/**/*.scss',
      '!assets/scss/font.scss',
      '!assets/scss/_old/**/*.scss'
      ])
      .pipe(compilehandlebars(JSON.parse(fs.readFileSync('./data/gulpdata.json')), HBoptions))
      .pipe(styleguide.generate({
          extraHead: '<style type="text/css">.sg.wrapper { max-width:3000px !important; }</style>',
          title: 'ustwo style guide',
          rootPath: 'public/styleguide',
          appRoot: '/2015/styleguide',
          disableHtml5Mode: true,
          overviewPath: 'STYLEGUIDE.md'
        }))
      .pipe(gulp.dest('public/styleguide'))
      .pipe(gulp.dest('public/2015/styleguide'));
  },
  // --------------------------
  //
  // --------------------------
  styleguideApply: function(cb) {
    return gulp.src([
      'assets/scss/font.scss',
      'assets/scss/ustwo.scss'
      ])
      .pipe(sass({
        sourceComments: !production,
        outputStyle: production ? 'compressed' : 'nested'
      }))
      .pipe(styleguide.applyStyles())
      .pipe(gulp.dest('public/styleguide'))
      .pipe(gulp.dest('public/2015/styleguide'));
  },
  // --------------------------
  // Browserify
  // --------------------------
  browserify: function() {
    var bundler = browserify('source/index.js', {
      debug: !production,
      cache: {}
    }).transform(babel);
    // determine if we're doing a build
    // and if so, bypass the livereload
    var build = argv._.length ? argv._[0] === 'build' : false;
    if (watch) {
      bundler = watchify(bundler);
    }
    var rebundle = function() {
      return bundler.bundle()
        .on('error', handleError('Browserify'))
        .pipe(source('build.js'))
        .pipe(gulpif(production, buffer()))
        .pipe(gulpif(production, uglify()))
        .pipe(gulp.dest('public/js/'));
    };
    bundler.on('update', rebundle);
    return rebundle();
  },
  // --------------------------
  // linting
  // --------------------------
  lintjs: function() {
    return gulp.src([
        'source/index.js'
      ]).pipe(jshint({esnext: true}))
      .pipe(jshint.reporter(stylish))
      .on('error', function() {
        beep();
      });
  },
  // --------------------------
  // Optimize asset images
  // --------------------------
  optimize: function() {
    return gulp.src('assets/static/img/**/*.{gif,jpg,png,svg}')
      // .pipe(imagemin({
      //   progressive: true,
      //   svgoPlugins: [{removeViewBox: false}],
      //   // png optimization
      //   optimizationLevel: production ? 3 : 1
      // }))
      .pipe(gulp.dest('public/2015/images'))
      .pipe(gulp.dest('public/images'));
  },
  // --------------------------
  // Testing with mocha
  // --------------------------
  test: function() {
    return gulp.src('source/**/*test.js', {read: false})
      .pipe(mocha({
        'ui': 'bdd',
        'reporter': 'spec'
      })
    );
  },
  data: function() {
    return gulp.src('data/**/*.json')
      .pipe(gulp.dest('public/data')
    );
  },
};

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "public"
        },
        open: false,
        port: process.env.PORT || 3000
    });
});

// gulp.task('reload-sass', ['sass'], function(){
//   browserSync.reload();
// });
gulp.task('reload-ruby-sass', ['rubysass'], function(){
  browserSync.reload();
});
gulp.task('reload-sass', ['sass', 'styleguideGenerate', 'styleguideApply'], function(){
  browserSync.reload();
});
gulp.task('reload-data', ['data', 'templates', 'styleguideGenerate'], function(){
  browserSync.reload();
});
gulp.task('reload-js', ['browserify'], function(){
  browserSync.reload();
});
gulp.task('reload-templates', ['templates', 'handlebars', 'styleguideGenerate', 'styleguideApply'], function(){
  browserSync.reload();
});

// --------------------------
// CUSTOMS TASKS
// --------------------------
gulp.task('clean', tasks.clean);
// for production we require the clean method on every individual task
var req = build ? ['clean'] : [];
// individual tasks
gulp.task('templates', req, tasks.templates);
gulp.task('handlebars', req, tasks.handlebars);
gulp.task('assets', req, tasks.optimize);
gulp.task('sass', req, tasks.sass);
gulp.task('rubysass', req, tasks.rubysass);
gulp.task('browserify', req, tasks.browserify);
gulp.task('lint:js', tasks.lintjs);
gulp.task('optimize', tasks.optimize);
gulp.task('test', tasks.test);
gulp.task('data', tasks.data);
gulp.task('styleguideGenerate', tasks.styleguideGenerate);
gulp.task('styleguideApply', tasks.styleguideApply);

// --------------------------
// DEV/WATCH TASK
// --------------------------
gulp.task('watch', ['assets', 'templates', 'handlebars', 'rubysass', 'sass', 'browserify', 'data', 'styleguideGenerate', 'styleguideApply', 'browser-sync'], function() {

  // --------------------------
  // watch:assets
  // --------------------------
  gulp.watch('assets/static/img/**/*.{gif,jpg,png,svg}', ['assets']);

  // --------------------------
  // watch:sass
  // --------------------------
  gulp.watch(['assets/scss/**/*.scss', '!assets/scss/_old/**/*.scss'], ['reload-sass']);
  gulp.watch('assets/scss/_old/**/*.scss', ['reload-ruby-sass']);

  // --------------------------
  // watch:js
  // --------------------------
  gulp.watch('source/**/*.js', ['lint:js', 'reload-js']);

  // --------------------------
  // watch:html
  // --------------------------
  gulp.watch('templates/**/*.{html,handlebars}', ['reload-templates']);

  gulp.watch('data/**/*.json', ['reload-data']);

  gutil.log(gutil.colors.bgGreen('Watching for changes...'));
});

// build task
gulp.task('build', [
  'clean',
  'templates',
  'handlebars',
  'assets',
  'rubysass',
  'browserify',
  'data',
  'styleguideGenerate',
  'styleguideApply'
]);

gulp.task('default', ['watch']);

// gulp (watch) : for development and livereload
// gulp build : for a one off development build
// gulp build --production : for a minified production build
