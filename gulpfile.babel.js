import gulp from 'gulp';

import {info, error, handleError} from './src/scripts/helpers';
import vendors from './src/scripts/vendors';
import spa from './src/scripts/spa';
import {css, watch as cssWatch} from './src/scripts/css';
import styleguide from './src/scripts/styleguide';

const verbose = process.env.VERBOSE;

info(`Verbose: ${!!verbose}`);

/*
 * Optimize images
 */
function images() {
  gulp.src('src/app/images/**/*.{gif,jpg,png,svg}')
    .pipe(gulp.dest('public/images'));
  gulp.src('src/app/images/favicon.{png,ico}')
      .pipe(gulp.dest('public'));
};


gulp.task('images', images);
gulp.task('css', css);
gulp.task('css:watch', ['css'], cssWatch);
gulp.task('vendors', vendors);
gulp.task('spa', spa);
gulp.task('styleguide', styleguide);

gulp.task('build', ['images',
                    'css',
                    'vendors',
                    'spa']);

gulp.task('default', ['build']);
