/*
 * React style guide
 * TODO: BROKEN
 */
function styleguide() {
  let bundler = browserify({
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

  let bundle = function() {
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
}

export default styleguide;
