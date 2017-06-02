#!/bin/bash
set -e

base="/home/ustwo"
filename="$base/public/js/vendors.js"

mkdir -p $base/public/js

if [[ $FLUSH_CACHE == "true" ]]; then
  if [[ -d $base/public/.cache-vendors ]]; then
    rm -rf $base/public/.cache-vendors/
  fi
fi

if [[ "$VERBOSE" == "true" ]]; then
  echo "Compiling the SPA vendors in development mode..."
  NODE_ENV=development persistify -g [ envify --NODE_ENV development ] \
             --debug \
             --require babelify/polyfill \
             --require react \
             --require react-dom \
             --require react-addons-test-utils \
             --require svg4everybody \
             --require classnames \
             --require ellipsize \
             --require es6-promise \
             --require moment \
             --require scrollmagic \
             --require react-responsive \
             --require react-swipe \
             --verbose \
             --cache-dir $base/public/.cache-vendors \
             --outfile $filename
fi

if [[ -z "$VERBOSE" ]]; then
  echo "Compiling the SPA vendors in production mode..."
  NODE_ENV=production browserify -g [ envify --NODE_ENV production ] \
             --require babelify/polyfill \
             --require react \
             --require react-dom \
             --require react-addons-test-utils \
             --require svg4everybody \
             --require classnames \
             --require ellipsize \
             --require es6-promise \
             --require moment \
             --require scrollmagic \
             --require react-responsive \
             --require react-swipe \
             -g uglifyify \
             -p bundle-collapser/plugin \
  | uglifyjs --compress --mangle --comments > $filename
fi

echo "Done with the SPA vendors"
