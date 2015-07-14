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
var sourcemaps = require('gulp-sourcemaps');

// sass
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');

// BrowserSync
var browserSync = require('browser-sync');

// js
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var reactify = require('reactify');
var nodemon = require('gulp-nodemon');

// testing
var mocha = require('gulp-mocha');

// production flag
var production;

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

    if (watch) this.emit('end');
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
      .pipe(gulpif(!production, sourcemaps.init()))
      .pipe(sass({
        errLogToConsole: true,
        sourceComments: !production,
        outputStyle: production ? 'compressed' : 'nested'
      }))
      .on('error', function(err) {
        sass.logError(err);
        if (watch) this.emit('end'); //continue the process in dev
      })
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
  // Reactify
  // --------------------------
  reactify: function() {
    // Create a separate vendor bundler that will only run when starting gulp
    var vendorBundler = browserify({
      debug: !production // Sourcemapping
    })
    .require('babelify/polyfill')
    .require('react');

    var bundler = browserify({
      debug: !production, // Sourcemapping
      cache: {},
      packageCache: {},
      fullPaths: watch
    })
    .require(require.resolve('./src/node_modules/index.js'), { entry: true })
    .transform(babelify.configure({
        optional: ["es7.classProperties"]
    }))
    .transform(reactify, {"es6": true})
    .external('babelify/polyfill')
    .external('react');

    if (watch) {
      bundler = watchify(bundler);
    }

    var rebundle = function() {
      return bundler.bundle()
        .on('error', handleError('Browserify'))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulpif(production, uglify()))
        .pipe(gulpif(!production, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(!production, sourcemaps.write('./')))
        .pipe(gulp.dest('public/js/'));
    };

    if (watch) {
      bundler.on('update', rebundle);
    }

    vendorBundler.bundle()
      .pipe(source('vendors.js'))
      .pipe(buffer())
      .pipe(gulpif(production, uglify()))
      .pipe(gulp.dest('public/js/'));

    return rebundle();
  },
  // --------------------------
  // React style guide
  // --------------------------
  reactstyleguide: function() {
    var bundler = browserify({
      debug: !production,
      cache: {},
      packageCache: {},
      fullPaths: watch
    })
    .require(require.resolve('./src/node_modules/styleguide.js'), { entry: true })
    .transform(babelify.configure({
        optional: ["es7.classProperties"]
    }))
    .transform(reactify, {"es6": true})
    .external('babelify/polyfill')
    .external('react');

    if (watch) {
      bundler = watchify(bundler);
    }

    var rebundle = function() {
      return bundler.bundle()
        .on('error', handleError('Browserify'))
        .pipe(source('styleguide.js'))
        .pipe(buffer())
        .pipe(gulpif(production, uglify()))
        .pipe(gulpif(!production, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(!production, sourcemaps.write('./')))
        .pipe(gulp.dest('public/js/'));
    };

    if (watch) {
      bundler.on('update', rebundle);
    }

    return rebundle();
  },
  // --------------------------
  // Optimize asset images
  // --------------------------
  assets: function() {
    return gulp.src('src/assets/images/**/*.{gif,jpg,png,svg}')
      .pipe(gulp.dest('public/images'));
  },
  // --------------------------
  // Testing with mocha
  // --------------------------
  test: function() {
    return gulp.src('src/node_modules/**/*test.js', {read: false})
      .pipe(mocha({
        'ui': 'bdd',
        'reporter': 'spec'
      })
    );
  },
  data: function() {
    return gulp.src('src/data/**/*.json')
      .pipe(gulp.dest('public/data')
    );
  },
  serve: function(cb) {
  	var started = false;
  	return nodemon({
      script: 'src/server/index.js',
      watch: ['src/server'],
      exec: './node_modules/.bin/babel-node',
      env: { 'NODE_ENV': 'development' }
  	}).on('start', function () {
  		// to avoid nodemon being started multiple times
  		// thanks @matthisk
  		if (!started) {
  			cb();
  			started = true;
  		}
  	});
  },
  setProduction: function () {
    production = true;
  }
};


gulp.task('browser-sync', function() {
  browserSync(null, {
    proxy: "http://localhost:3333",
    open: false,
    ghostMode: {
      scroll: true
    }
  });
});

gulp.task('reload-sass', ['sass'], function(){
  browserSync.reload();
});
gulp.task('reload-data', ['data'], function(){
  browserSync.reload();
});
gulp.task('reload-jsx', ['reactify', 'reactstyleguide'], function(){
  browserSync.reload();
});

// --------------------------
// CUSTOMS TASKS
// --------------------------
gulp.task('clean', tasks.clean);
gulp.task('assets', tasks.assets);
gulp.task('sass', tasks.sass);
gulp.task('reactify', tasks.reactify);
gulp.task('reactstyleguide', tasks.reactstyleguide);
gulp.task('data', tasks.data);
gulp.task('test', tasks.test);
gulp.task('serve', ['build'], tasks.serve);
gulp.task('start', ['clean', 'serve']);

// build task
gulp.task('build', [
  'assets',
  'sass',
  'reactify',
  'reactstyleguide',
  'data'
]);

gulp.task('setProduction', tasks.setProduction);

// production build task
gulp.task('production', ['setProduction', 'build']);

// --------------------------
// DEV/WATCH TASK
// --------------------------
gulp.task('default', ['start'], function() {
  // TODO: make watch restart on error, see: https://github.com/appium/DynamicApp/blob/master/injector/gulpfile.js

  // --------------------------
  // watch:assets
  // --------------------------
  gulp.watch('src/assets/images/**/*.{gif,jpg,png,svg}', ['assets']);

  // --------------------------
  // watch:sass
  // --------------------------
  gulp.watch(['src/assets/scss/**/*.scss'], ['reload-sass']);

  // --------------------------
  // watch:js
  // --------------------------
  gulp.watch('src/node_modules/**/*.js', ['reload-jsx']);

  // --------------------------
  // watch:data
  // --------------------------
  gulp.watch('src/data/**/*.json', ['reload-data']);

  gutil.log(gutil.colors.bgGreen('Watching for changes...'));
});

// gulp build : for a one off development build
// gulp build --production : for a minified production build
