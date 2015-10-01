'use strict';
var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var exec = require('child_process').exec;
var buffer = require('vinyl-buffer');
var argv = require('yargs').argv;
var sourcemaps = require('gulp-sourcemaps');

// sass
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// js
var browserify = require('browserify');
var babelify = require('babelify');
var aliasify = require('aliasify');
var source = require('vinyl-source-stream');

var verbose = !!argv.verbose;

gutil.log(gutil.colors.bgGreen('Flags:', 'verbose:', verbose));

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
  // SASS (libsass)
  // --------------------------
  css: function () {
    return gulp.src([
      'src/app/index.scss'
    ])
      .pipe(sourcemaps.init({debug: verbose,}))
      .pipe(sass({
        includePaths: ['src/app/components', 'src/app/libs'],
        errLogToConsole: true,
        sourceComments: !verbose,
        outputStyle: (verbose ? 'nested' : 'compressed')
      }))
      .on('error', function (err) {
        sass.logError.bind(this, err)();
      })
      .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
      .pipe(gulpif(verbose, sourcemaps.write()))
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
                    debug: verbose,
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
            .pipe(gulpif(!verbose, uglify()))
            .pipe(gulp.dest('public/js'));
            // .pipe(fs.createWriteStream(path.join(__dirname,
            //                                      'public/js/app.js'), 'utf8'));
  },
  // --------------------------
  // React style guide
  // --------------------------
  styleguide: function() {
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
        .pipe(gulpif(!verbose, uglify()))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/js/'));
    };

    return bundle();
  },
  // --------------------------
  // Optimize asset images
  // --------------------------
  assets: function () {
    gulp.src('src/app/images/**/*.{gif,jpg,png,svg}')
      .pipe(gulp.dest('public/images'));
    gulp.src('src/app/images/favicon.{png,ico}')
        .pipe(gulp.dest('public'));
  },
  data: function () {
    return gulp.src('src/data/**/*.json')
      .pipe(gulp.dest('public/data')
    );
  }
};

// --------------------------
// CUSTOMS TASKS
// --------------------------
gulp.task('assets', tasks.assets);
gulp.task('css', tasks.css);
gulp.task('css:watch', tasks.cssWatch);
gulp.task('vendors', tasks.vendors);
gulp.task('spa', tasks.spa);
gulp.task('styleguide', tasks.styleguide);
gulp.task('data', tasks.data);

// build task
gulp.task('build', ['assets',
                    'css',
                    'vendors',
                    'spa',
                    // 'styleguide',
                    'data']);

// --------------------------
// CSS ONLY WATCH TASK
// --------------------------
gulp.task('css:watch', function () {

  // --------------------------
  // watch:sass
  // --------------------------
  gulp.watch(['src/app/**/*.scss'], ['css']);

  gutil.log(gutil.colors.bgGreen('Watching for changes...'));
});

gulp.task('default', ['build']);
