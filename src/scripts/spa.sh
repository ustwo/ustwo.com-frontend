#!/bin/bash
set -e

filename="/usr/local/src/public/js/app.js"

if [[ "$VERBOSE" -eq "true" ]]; then
  browserify_verbose="--debug"
else
  uglify="uglifyjs --mangle --comments --stats"
fi

mkdir -p /usr/local/src/public/js

browserify /usr/local/src/src/app/index.js \
           $browserify_verbose \
           --transform [babelify --stage 0] \
           --transform [aliasify --require /usr/local/src/scripts/aliases.json] \
           --external babelify/polyfill \
           --external react \
           --external svg4everybody \
           --external babel \
           --external classnames \
           --external ellipsize \
           --external es6-promise \
           --external gsap \
           --external lodash \
           --external moment \
           --external react-helmet \
           --external react-style-guide \
           --external react-transition-manager \
           --external scrollmagic \
           --outfile $filename

echo ">>> $VERBOSE"
if [[ "$VERBOSE" -ne "true" ]]; then
  echo "here"
  uglifyjs --mangle --comments --stats -o $filename -- $filename
fi
