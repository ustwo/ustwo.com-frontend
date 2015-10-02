import {exec} from 'child_process';

/*
 * Creates the SPA (Single Page Application compilation) bundle
 *
 * TODO: Consolidate approach
 */
function spa() {
  return exec("./src/scripts/spa.sh");
}

    // var bundler = browserify({
    //                 debug: verbose,
    //                 // insertGlobals: false,
    //                 // detectGlobals: false,
    //                 cache: {},
    //                 packageCache: {}})
    //               .require(require.resolve('./src/app/index.js'),
    //                        { entry: true })
    //               .transform(babelify.configure({
    //                   optional: ["es7.classProperties"]}))
    //               .transform(aliasify, require('./package.json').aliasify)
    //               .external('babelify/polyfill')
    //               .external('react')
    //               .external('svg4everybody');

    // return bundler.bundle()
    //         .on('error', handleError('Browserify'))
    //         .pipe(source('app.js'))
    //         .pipe(buffer())
    //         .pipe(gulpif(!verbose, uglify()))
    //         .pipe(gulp.dest('public/js'));
    //         // .pipe(fs.createWriteStream(path.join(__dirname,
    //         //                                      'public/js/app.js'), 'utf8'));
  // },


export default spa;
