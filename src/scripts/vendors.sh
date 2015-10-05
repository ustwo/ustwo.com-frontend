#!/bin/bash
set -e

base="/usr/local/src"
filename="$base/public/js/vendors.js"

if [[ -z $FLUSH_CACHE ]]; then
  if [[ -d $base/public/.cache ]]; then
    cp -R $base/public/.cache \
          $base/node_modules/persistify/node_modules/flat-cache/
  fi
fi

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
           --outfile $filename

cp -R $base/node_modules/persistify/node_modules/flat-cache/.cache \
      $base/public/

if [[ -z "$VERBOSE" ]]; then
  uglifyjs --mangle --comments --stats -o $filename -- $filename
fi
