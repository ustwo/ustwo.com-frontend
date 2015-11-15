#!/bin/sh
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

if [[ -z $FLUSH_CACHE ]]; then
  if [[ -d $base/public/.cache-spa ]]; then
    rsync -r $base/public/.cache-spa/ \
             $base/node_modules/persistify/node_modules/flat-cache/.cache/
  fi
else
  rm -rf $base/public/.cache-spa
fi

persistify $input \
           $browserify_verbose \
           --transform [babelify --stage 0] \
           --transform [aliasify --require $aliases] \
           --external babelify/polyfill \
           --external react \
           --external svg4everybody \
           --external classnames \
           --external ellipsize \
           --external es6-promise \
           --external moment \
           --external react-transition-manager \
           --external scrollmagic \
           --external react-responsive \
           --verbose \
           --outfile $filename

rsync -r $base/node_modules/persistify/node_modules/flat-cache/.cache/ \
         $base/public/.cache-spa/

if [[ -z "$VERBOSE" ]]; then
  uglifyjs --mangle --comments --stats -o $filename -- $filename
fi

echo "Done with the SPA"
