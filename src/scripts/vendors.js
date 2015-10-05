import {exec} from 'child_process';

// import browserify from 'browserify';
// import persistify from 'persistify';
// import fs from 'fs';
// import path from 'path';
// import uglify from 'uglify-js';
// import through from 'through2';
// import buffer from 'vinyl-buffer';
// import source from 'vinyl-source-stream';

// import {handleError} from './helpers';

/*
 * Creates a Vendor bundle
 *
 * TODO: Consolidate approach
 */
function vendors() {
  return exec("./src/scripts/vendors.sh");
}


// function vendors() {
//   const vendorPath = path.join(__dirname, '../../public/js/vendors.js');
//   const vendorMapPath = path.join(__dirname, '../../public/js/vendors.map.json');
//   // const vendorMapPath = 'vendors.map.json';

//   return browserify({noParse: false})
//             .require('babelify/polyfill')
//             .require('react')
//             .require('svg4everybody')
//             .on('error', handleError('Browserify'))
//             .bundle()
//             // .pipe(source('vendors.js'))
//             // .pipe(buffer())
//             // .pipe(minify())
//             .pipe(fs.createWriteStream(vendorPath), 'utf8');
// }

// function minify() {
//   return through.obj(function (chunk, encoding, next) {
//     const options = {fromString: true, output: {}};
//     let str = chunk;
//     // let str = chunk.toString();

//     console.log(str.toString());

//     // let mangled = uglify.minify(str, options);

//     // chunk.source = new Buffer(mangled.code);

//     // console.log(">>", mangled);

//     // this.push(chunk);

//     next();
//   })
//   .on('data', function (data) {
//     // console.log(">>", data.isStream());
//   })
//   .on('end', function () {
//     console.log("end");
//   })
// }

export default vendors;
