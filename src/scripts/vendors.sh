#!/bin/sh
set -e

echo "Compiling the SPA vendors..."

base="/home/ustwo"
filename="$base/public/js/vendors.js"

mkdir -p $base/public/js

if [[ -z $FLUSH_CACHE ]]; then
  if [[ -d $base/public/.cache-vendors ]]; then
    rsync -r $base/public/.cache-vendors/ \
             $base/node_modules/persistify/node_modules/flat-cache/.cache/
  fi
else
  rm -rf $base/public/.cache-vendors
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
           --require react-responsive \
           --verbose \
           --outfile $filename

rsync -r $base/node_modules/persistify/node_modules/flat-cache/.cache/ \
         $base/public/.cache-vendors/

if [[ -z "$VERBOSE" ]]; then
  uglifyjs --mangle --comments --stats -o $filename -- $filename
fi

echo "Done with the SPA vendors"
