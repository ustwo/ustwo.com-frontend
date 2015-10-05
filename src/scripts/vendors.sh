#!/bin/bash
set -e

base="/usr/local/src"
filename="$base/public/js/vendors.js"

# browserify --require babelify/polyfill \
persistify --require babelify/polyfill \
           --require react \
           --require svg4everybody \
           --require classnames \
           --require ellipsize \
           --require es6-promise \
           --require moment \
           --require react-transition-manager \
           --require scrollmagic \
           --verbose \
           --recreate \
           --outfile $filename

ls -la

# uglifyjs --mangle \
#          --comments \
#          --stats \
#          -o $filename
