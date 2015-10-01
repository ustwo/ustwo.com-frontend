'use strict';
var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var exec = require('child_process').exec;
var buffer = require('vinyl-buffer');
var argv = require('yargs').argv;
var sourcemaps = require('gulp-sourcemaps');
var exorcist = require('exorcist');

// sass
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// js
var browserify = require('browserify');
var babelify = require('babelify');
var aliasify = require('aliasify');
var source = require('vinyl-source-stream');

// production flag
var production = !argv.dev;
var styleguide = argv.styleguide;

gutil.log(gutil.colors.bgGreen('Flags:', 'production:', production, "styleguide:", styleguide));

// ----------------------------
// Error notification methods
// ----------------------------
function handleError(task) {
  return function (err) {
    gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err));
  };
};

// --------------------------
// CUSTOM TASK METHODS
// --------------------------
var tasks = {
  // --------------------------
  // Delete build folder
  // --------------------------
  clean: function() {
    del.sync(['public']);

    return gulp.src('node_modules/.gitignore')
      .pipe(gulp.dest('public/')
    );
  },
  // --------------------------
  // SASS (libsass)
  // --------------------------
  sass: function () {
    return gulp.src([
      'src/app/index.scss'
    ])
      .pipe(sourcemaps.init({
        debug: true,
        loadMaps: true
      }))
      .pipe(sass({
        includePaths: ['src/app/components', 'src/app/libs'],
        errLogToConsole: true,
        sourceComments: !production,
        outputStyle: (production ? 'compressed' : 'nested')
      }))
      .on('error', function (err) {
        sass.logError.bind(this, err)();
      })
      .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('public/css'));
  },
  vendors: function () {
    // Create a separate vendor bundler that will only run when starting gulp
    var bundler = browserify({noParse: false})
                    .require('babelify/polyfill')
                    .require('react')
                    .require('svg4everybody');

    return bundler.bundle()
            .on('error', handleError('Browserify'))
            .pipe(source('vendors.js'))
            .pipe(buffer())
            .pipe(uglify({preserveComments: 'license'}))
            .pipe(gulp.dest('public/js'));
  },
  // --------------------------
  // SPA (Single Page Application compilation)
  // --------------------------
  spa: function () {
    var bundler = browserify({
                    debug: true,
                    // insertGlobals: false,
                    // detectGlobals: false,
                    cache: {},
                    packageCache: {}})
                  .require(require.resolve('./src/app/index.js'),
                           { entry: true })
                  .transform(babelify.configure({
                      optional: ["es7.classProperties"]}))
                  .transform(aliasify, require('./package.json').aliasify)
                  .external('babelify/polyfill')
                  .external('react')
                  .external('svg4everybody');

    return bundler.bundle()
            .on('error', handleError('Browserify'))
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(gulpif(production, uglify()))
            .pipe(gulp.dest('public/js'));
            // .pipe(fs.createWriteStream(path.join(__dirname,
            //                                      'public/js/app.js'), 'utf8'));
  },
  // --------------------------
  // React style guide
  // --------------------------
  reactstyleguide: function() {
    var bundler = browserify({
      debug: true, // Sourcemapping
      cache: {},
      packageCache: {}
    })
    .require(require.resolve('./src/app/styleguide.js'), { entry: true })
    .transform(babelify.configure({
        optional: ["es7.classProperties"]
    }))
    .external('babelify/polyfill')
    .external('react');

    var bundle = function() {
      return bundler.bundle()
        .on('error', handleError('Browserify'))
        .pipe(source('styleguide.js'))
        .pipe(buffer())
        .pipe(gulpif(production, uglify()))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/js/'));
    };

    return bundle();
  },
  // --------------------------
  // Optimize asset images
  // --------------------------
  assets: function() {
    gulp.src('src/app/images/**/*.{gif,jpg,png,svg}')
      .pipe(gulp.dest('public/images'));
    gulp.src('src/app/images/favicon.{png,ico}')
        .pipe(gulp.dest('public'));
  },
  data: function() {
    return gulp.src('src/data/**/*.json')
      .pipe(gulp.dest('public/data')
    );
  },
  serve: function(cb) {
    return exec('./node_modules/.bin/babel-node src/server/index.js', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  }
};

// --------------------------
// CUSTOMS TASKS
// --------------------------
gulp.task('clean', tasks.clean);
gulp.task('assets', tasks.assets);
gulp.task('sass', tasks.sass);
gulp.task('vendors', tasks.vendors);
gulp.task('spa', tasks.spa);
gulp.task('styleguide', tasks.styleguide);
gulp.task('data', tasks.data);
gulp.task('serve', ['build'], tasks.serve);
gulp.task('start', ['clean', 'build']);

// build task
gulp.task('build', ['assets',
                    'sass',
                    'vendors',
                    'spa',
                    // 'styleguide',
                    'data']);

// --------------------------
// CSS ONLY WATCH TASK
// --------------------------
gulp.task('css', function() {

  // --------------------------
  // watch:sass
  // --------------------------
  gulp.watch(['src/app/**/*.scss'], ['sass']);

  gutil.log(gutil.colors.bgGreen('Watching for changes...'));
});

gulp.task('default', ['start']);
