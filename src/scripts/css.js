import {exec} from 'child_process';
import gulp from 'gulp';
import {info} from './helpers';

const verbose = process.env.VERBOSE;

function css() {
  return exec("./src/scripts/css.sh");
}

function watch() {
  gulp.watch(['src/app/**/*.scss'], ['css']);

  return info('Watching for changes...');
}

export default {css, watch};
