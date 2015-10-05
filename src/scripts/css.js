import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import gulpif from 'gulp-if';
import gulp from 'gulp';

import {info} from './helpers';

const verbose = process.env.VERBOSE;

function css() {
  return gulp.src(['src/app/index.scss'])
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
}

function watch() {
  gulp.watch(['src/app/**/*.scss'], ['css']);

  return info('Watching for changes...');
}

export default {css, watch};
