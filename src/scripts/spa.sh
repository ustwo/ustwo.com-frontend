#!/bin/bash
set -e

base="/usr/local/src"
input="$base/src/app/index.js"
filename="$base/public/js/app.js"
aliases="$base/scripts/aliases.json"

if [[ "$VERBOSE" -eq "true" ]]; then
  browserify_verbose="--debug"
fi

mkdir -p $base/public/js

browserify $input \
           $browserify_verbose \
           --transform [babelify --stage 0] \
           --transform [aliasify --require $aliases] \
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

if [[ -z "$VERBOSE" ]]; then
  uglifyjs --mangle --comments --stats -o $filename -- $filename
fi
