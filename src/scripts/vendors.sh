#!/bin/bash
set -e

base="/usr/local/src"
filename="$base/public/js/vendors.js"

browserify --require babelify/polyfill \
           --require react \
           --require svg4everybody \
           --require classnames \
           --require ellipsize \
           --require es6-promise \
           --require moment \
           --require react-transition-manager \
           --require scrollmagic \
| uglifyjs --mangle \
           --comments \
           --stats \
           -o $filename
