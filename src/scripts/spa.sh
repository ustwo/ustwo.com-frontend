#!/bin/bash
set -e

base="/home/ustwo"
input="$base/src/app/index.js"
filename="$base/public/js/app.js"
aliases="$base/src/app/aliases.json"

mkdir -p $base/public/js

if [[ $FLUSH_CACHE == "true" ]]; then
  if [[ -d $base/public/.cache-spa ]]; then
    rm -rf $base/public/.cache-spa
  fi
fi

if [[ "$VERBOSE" == "true" ]]; then
  echo "Compiling the SPA in development mode..."
  NODE_ENV=development persistify $input \
             -g [ envify --NODE_ENV development ] \
             --debug \
             --transform [babelify --stage 0] \
             --transform [aliasify --require $aliases] \
             --external babelify/polyfill \
             --external react \
             --external react-dom \
             --external react-addons-test-utils \
             --external svg4everybody \
             --external classnames \
             --external ellipsize \
             --external es6-promise \
             --external moment \
             --external scrollmagic \
             --external react-responsive \
             --external react-swipe \
             --verbose \
             --cache-dir $base/public/.cache-spa \
             --outfile $filename
fi

if [[ -z "$VERBOSE" ]]; then
  echo "Compiling the SPA in production mode..."
  NODE_ENV=production browserify $input \
             -g [ envify --NODE_ENV production ] \
             --transform [babelify --stage 0] \
             --transform [aliasify --require $aliases] \
             --external babelify/polyfill \
             --external react \
             --external react-dom \
             --external react-addons-test-utils \
             --external svg4everybody \
             --external classnames \
             --external ellipsize \
             --external es6-promise \
             --external moment \
             --external scrollmagic \
             --external react-responsive \
             --external react-swipe \
             -g uglifyify \
             -p bundle-collapser/plugin \
  | uglifyjs --compress --mangle --comments --warn > $filename
fi

echo "Done with the SPA"
