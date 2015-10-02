#!/bin/bash
set -e

browserify -r babelify/polyfill \
           -r react \
           -r svg4everybody \
| uglifyjs --mangle \
           --comments \
           --stats \
           -o /usr/local/src/public/js/vendors.js
