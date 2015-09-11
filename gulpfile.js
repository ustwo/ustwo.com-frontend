'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var exec = require('child_process').exec;
var buffer = require('vinyl-buffer');
var argv = require('yargs').argv;
var sourcemaps = require('gulp-sourcemaps');

// sass
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');

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
var handleError = function(task) {
  return function(err) {
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
  sass: function() {
    return gulp.src('src/assets/scss/[^_]*.scss')
      // sourcemaps + sass + error handling
      .pipe(sourcemaps.init())
      .pipe(sass({
        errLogToConsole: true,
        sourceComments: !production,
        outputStyle: (production ? 'compressed' : 'nested')
      }))
      .on('error', function(err) {
        sass.logError.bind(this, err)();
      })
      // generate .maps
      .pipe(sourcemaps.write({
        'includeContent': false,
        'sourceRoot': '.'
      }))
      // autoprefixer
      .pipe(sourcemaps.init({
        'loadMaps': true
      }))
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
  // Reactify
  // --------------------------
  reactify: function() {
    // Create a separate vendor bundler that will only run when starting gulp
    var vendorBundler = browserify({
      debug: !production // Sourcemapping
    })
    .require('babelify/polyfill')
    .require('react')
    .require('svg4everybody');

    var bundler = browserify({
      debug: true, // Sourcemapping
      cache: {},
      packageCache: {}
    })
    .require(require.resolve('./src/app/index.js'), { entry: true })
    .transform(babelify.configure({
        optional: ["es7.classProperties"]
    }))
    .transform(aliasify, require('./package.json').aliasify)
    .external('babelify/polyfill')
    .external('react')
    .external('svg4everybody');

    var bundle = function() {
      return bundler.bundle()
        .on('error', handleError('Browserify'))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulpif(production, uglify()))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/js/'));
    };

    vendorBundler.bundle()
      .pipe(source('vendors.js'))
      .pipe(buffer())
      .pipe(gulpif(production, uglify()))
      .pipe(gulp.dest('public/js/'));

    return bundle();
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
    gulp.src('src/assets/images/**/*.{gif,jpg,png,svg}')
      .pipe(gulp.dest('public/images'));
    gulp.src('src/assets/favicon.{png,ico}')
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
gulp.task('reactify', tasks.reactify);
gulp.task('reactstyleguide', tasks.reactstyleguide);
gulp.task('data', tasks.data);
gulp.task('serve', ['build'], tasks.serve);
gulp.task('start', ['clean', 'build']);

// build task
gulp.task('build', [
  'assets',
  'sass',
  'reactify',
  // 'reactstyleguide',
  'data'
]);

// --------------------------
// CSS ONLY WATCH TASK
// --------------------------
gulp.task('css', function() {

  // --------------------------
  // watch:sass
  // --------------------------
  gulp.watch(['src/assets/scss/**/*.scss'], ['sass']);

  gutil.log(gutil.colors.bgGreen('Watching for changes...'));
});

gulp.task('default', ['start']);
