#!/bin/bash
set -e

base="/usr/local/src"
filename="$base/public/js/vendors.js"

browserify --require babelify/polyfill \
           --require react \
           --require svg4everybody \
           --require babel \
           --require classnames \
           --require ellipsize \
           --require es6-promise \
           --require gsap \
           --require lodash \
           --require moment \
           --require react-helmet \
           --require react-style-guide \
           --require react-transition-manager \
           --require scrollmagic \
| uglifyjs --mangle \
           --comments \
           --stats \
           -o $filename
