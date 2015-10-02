'use strict';
import path from 'path';
import fs from 'fs';
import gulp from 'gulp';
import uglify from 'gulp-uglify';
import gulpif from 'gulp-if';
import {exec} from 'child_process';
import buffer from 'vinyl-buffer';
// css
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
// js
import browserify from 'browserify';
import babelify from 'babelify';
import aliasify from 'aliasify';
import source from 'vinyl-source-stream';

import {info, error, handleError} from './src/scripts/helpers';
import vendors from './src/scripts/vendors';

const verbose = process.env.VERBOSE;

info(`Verbose: ${!!verbose}`);

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
      .pipe(sass({
        includePaths: ['src/app/components', 'src/app/libs'],
        errLogToConsole: true,
        sourceMap: verbose,
        sourceMapContents: verbose,
        sourceComments: verbose,
        sourceMapEmbed: verbose,
        outFile: (verbose ? 'public/css/index.css' : null),
        outputStyle: (verbose ? 'nested' : 'compressed')
      }))
      .on('error', function (err) {
        sass.logError.bind(this, err)();
      })
      .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
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
gulp.task('vendors', vendors);
gulp.task('spa', tasks.spa);
gulp.task('styleguide', tasks.styleguide);
gulp.task('data', tasks.data);

// build task
gulp.task('build', ['assets',
                    'css',
                    'vendors',
                    'spa',
                    'data']);

// --------------------------
// CSS ONLY WATCH TASK
// --------------------------
gulp.task('css:watch', ['css'], function () {

  // --------------------------
  // watch:sass
  // --------------------------
  gulp.watch(['src/app/**/*.scss'], ['css']);

  info('Watching for changes...');
});

gulp.task('default', ['build']);
