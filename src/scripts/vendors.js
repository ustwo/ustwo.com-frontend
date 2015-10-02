import browserify from 'browserify';
import fs from 'fs';
import path from 'path';
import uglify from 'uglify-js';
import through from 'through2';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';

import {handleError} from './helpers';

/*
 * Creates a Vendor bundle
 *
 * TODO: Consolidate approach
 */
// function vendors() {
//   return exec("./src/scripts/vendors.sh");
// }

function vendors() {
  const vendorPath = path.join(__dirname, '../../public/js/vendors.js');

  return browserify({noParse: false})
          .require('babelify/polyfill')
          .require('react')
          .require('svg4everybody')
          .bundle()
          .on('error', handleError('Browserify'))
          // .pipe(source('vendors.js'))
          // .pipe(buffer())
          // .pipe(minify())
          .pipe(fs.createWriteStream(vendorPath), 'utf8');
}


function minify() {
  let options = {
    fromString: true,
    output: {}
  }

  function ug(file, encoding, callback) {
    if (file.isNull()) { return callback(null, file) }
    if (file.isStream()) { throw new Error("Unexpected stream") }

    const reSourceMapComment = /\n\/\/# sourceMappingURL=.+?$/;
    let str = String(file.contents);

    var mangled = uglify.minify(str, options);
    file.contents = new Buffer(mangled.code.replace(reSourceMapComment, ''));
    // file.contents = new Buffer(mangled.code);

    callback(null, file);
  }

  return through.obj(ug);
};


export default vendors;
