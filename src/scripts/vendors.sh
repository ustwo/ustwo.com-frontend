#!/bin/bash
set -e

echo "Compiling the SPA vendors..."

base="/home/ustwo"
filename="$base/public/js/vendors.js"

mkdir -p $base/public/js

if [[ $FLUSH_CACHE == "true" ]]; then
  if [[ -d $base/public/.cache-vendors ]]; then
    rm -rf $base/public/.cache-vendors/
  fi
fi

persistify --require babelify/polyfill \
           --require react \
           --require react-dom \
           --require svg4everybody \
           --require classnames \
           --require ellipsize \
           --require es6-promise \
           --require moment \
           --require scrollmagic \
           --require react-responsive \
           --verbose \
           --cache-dir $base/public/.cache-vendors \
           --outfile $filename

if [[ -z "$VERBOSE" ]]; then
  uglifyjs --mangle --comments --stats -o $filename -- $filename
fi

echo "Done with the SPA vendors"
