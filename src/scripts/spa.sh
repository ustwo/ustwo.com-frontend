#!/bin/bash
set -e

echo "Compiling the SPA..."

base="/home/ustwo"
input="$base/src/app/index.js"
filename="$base/public/js/app.js"
aliases="$base/src/app/aliases.json"

if [[ "$VERBOSE" == "true" ]]; then
  browserify_verbose="--debug"
fi

mkdir -p $base/public/js

if [[ $FLUSH_CACHE == "true" ]]; then
  if [[ -d $base/public/.cache-spa ]]; then
    rm -rf $base/public/.cache-spa
  fi
fi

persistify $input \
           $browserify_verbose \
           --transform [babelify --stage 0] \
           --transform [aliasify --require $aliases] \
           --external babelify/polyfill \
           --external react \
           --external react-dom \
           --external svg4everybody \
           --external classnames \
           --external ellipsize \
           --external es6-promise \
           --external moment \
           --external scrollmagic \
           --external react-responsive \
           --verbose \
           --cache-dir $base/public/.cache-spa \
           --outfile $filename


if [[ -z "$VERBOSE" ]]; then
  uglifyjs --mangle --comments --stats -o $filename -- $filename
fi

echo "Done with the SPA"
