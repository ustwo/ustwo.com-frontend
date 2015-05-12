'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var exec = require('child_process').exec;

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

var styleGuideOutputPath = './public/styleguide';

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

// ----------------------------
// Handlebars template config
// ----------------------------
var HBtemplateData = {
  title: 'ustwo',
  colours: {
    'piglet'            :'#ED0082',
    'softPiglet'        :'#FFA5BE',
    'passion'           :'#E60C29',
    'softPassion'       :'#FA7D78',
    'ohra'              :'#FF5519',
    'honey'             :'#FFBF02',
    'softHoney'         :'#F5E664',
    'jeezz'             :'#96CC29',
    'pot'               :'#14C04D',
    'softPot'           :'#A5FAAF',
    'mare'              :'#16D6D9',
    'softMare'          :'#A5FAFA',
    'blu'               :'#009CF3',
    'navy'              :'#143FCC',
    'rain'              :'#6114CC',
    'four'              :'#171D27',
    'white'             :'#FFFFFF',
    'grey'              :'#212121',
    'nonBlack'          :'#333333',
    'landingOrange'     :'#FF4F2D',
    'midGrey'           :'#BFBFBF',
    'paleGrey'          :'#DFDFDF',
    'pale-turquoise'    :'#7ECACA',
    'pink'              :'#DF498C',
    'new-blue'          :'#28A9E2'
  }
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
  },
  // --------------------------
  // HTML
  // --------------------------
  // html templates (when using the connect server)
  templates: function() {
    return gulp.src('./templates/*.{html,handlebars}')
      .pipe(compilehandlebars(HBtemplateData, HBoptions))
      .pipe(gulp.dest('public/'));
  },

  handlebars: function() {
    var partials = gulp.src(['./templates/_*.handlebars'])
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

    var templates = gulp.src('./templates/**/[^_]*.handlebars')
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
    return gulp.src('./assets/scss/*.scss')
      .pipe(scsslint())
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
  // SASS (libsass)
  // --------------------------
  rubysass: function() {
      return gulp.src('./assets/scss/ustwo.scss')
      .pipe(rubysass({bundleExec: true}))
      .on('error', function (err) { console.log(err.message); })
      .pipe(gulp.dest('public/css'));
  },
  // --------------------------
  //
  // --------------------------
  styleguideGenerate: function(cb) {
    return gulp.src([
      'assets/scss/ustwo.scss',
      'assets/scss/_variables.scss',
      'assets/scss/utils/_typography.scss',
      ])
      .pipe(compilehandlebars(HBtemplateData, HBoptions))
      .pipe(styleguide.generate({
          extraHead: '<link href="http://fnt.webink.com/wfs/webink.css/?project=2E393BD8-E94E-41FF-AF6F-074C1F2B6AF9&amp;fonts=A662D665-BC20-B3FD-B44C-A57A206F328C:f=PxGrotesk-Light,933D8DC6-8EC9-A6BD-33DE-EB816A44105A:f=PxGrotesk-Screen,93F90203-3D60-8B7B-9F87-7B585880EEF9:f=PxGrotesk-Regular,8F3750F8-E299-7CFD-2069-7AA8125652CE:f=PxGrotesk-RegularIta,1AEC341F-67D1-6F1C-2974-B45A4BD3C837:f=PxGrotesk-LightIta,B0CBCA70-418F-4482-421C-88B41ECCD5FA:f=PxGrotesk-Bold,F06E7859-C7AE-7BC9-DA36-BA8CCFC1BFEC:f=PxGrotesk-BoldIta,9E4A67B1-52AA-088D-2F00-62815998F7EA:f=FuturaPTExtraBold-Reg" rel="stylesheet" type="text/css" />',
          title: 'ustwo style guide',
          server: true,
          port: 3002,
          rootPath: styleGuideOutputPath,
          overviewPath: 'STYLEGUIDE.md'
        }))
      .pipe(gulp.dest(styleGuideOutputPath));
  },
  // --------------------------
  //
  // --------------------------
  styleguideApply: function(cb) {
    return gulp.src('./assets/scss/ustwo.scss')
      .pipe(rubysass({bundleExec: true}))
      .pipe(styleguide.applyStyles())
      .pipe(gulp.dest(styleGuideOutputPath));
  },
  // --------------------------
  // Browserify
  // --------------------------
  browserify: function() {
    var bundler = browserify('./source/index.js', {
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
        './source/index.js'
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
    return gulp.src('./assets/static/img/**/*.{gif,jpg,png,svg}')
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        // png optimization
        optimizationLevel: production ? 3 : 1
      }))
      .pipe(gulp.dest(styleGuideOutputPath+'/images'))
      .pipe(gulp.dest('public/images'));
  },
  // --------------------------
  // Testing with mocha
  // --------------------------
  test: function() {
    return gulp.src('./source/**/*test.js', {read: false})
      .pipe(mocha({
        'ui': 'bdd',
        'reporter': 'spec'
      })
    );
  },
  data: function() {
    return gulp.src('./data/**/*.json')
      .pipe(gulp.dest('public/data')
    );
  },
};

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./public"
        },
        open: false,
        port: process.env.PORT || 3000
    });
});

// gulp.task('reload-sass', ['sass'], function(){
//   browserSync.reload();
// });
gulp.task('reload-sass', ['rubysass', 'styleguideGenerate', 'styleguideApply'], function(){
  browserSync.reload();
});
gulp.task('reload-data', ['data'], function(){
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
gulp.task('watch', ['assets', 'templates', 'handlebars', 'rubysass', 'browserify', 'data', 'styleguideGenerate', 'styleguideApply', 'browser-sync'], function() {

  // --------------------------
  // watch:assets
  // --------------------------
  gulp.watch('./assets/static/img/**/*.{gif,jpg,png,svg}', ['assets']);

  // --------------------------
  // watch:sass
  // --------------------------
  gulp.watch('./assets/scss/**/*.scss', ['reload-sass']);

  // --------------------------
  // watch:js
  // --------------------------
  gulp.watch('./source/**/*.js', ['lint:js', 'reload-js']);

  // --------------------------
  // watch:html
  // --------------------------
  gulp.watch('./templates/**/*.{html,handlebars}', ['reload-templates']);

  gulp.watch('./data/**/*.json', ['reload-data']);

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
  'data'
]);

gulp.task('default', ['watch']);

// gulp (watch) : for development and livereload
// gulp build : for a one off development build
// gulp build --production : for a minified production build
