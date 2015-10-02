#!/bin/bash
set -e

P=/usr/local/src/node_modules/.bin/

$P/browserify -r babelify/polyfill \
           -r react \
           -r svg4everybody \
| $P/uglifyjs --mangle \
           --comments \
           --stats \
           -o /usr/local/src/public/js/vendors.js
