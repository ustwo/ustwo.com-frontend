#!/bin/bash
set -e

if [[ "$VERBOSE" -eq "true" ]]; then
  browserify_verbose="--debug"
else
  uglify="uglifyjs --mangle --comments --stats"
fi

browserify /usr/local/src/src/app/index.js \
           $browserify_verbose \
           --transform [babelify --stage 0] \
           --transform [aliasify --require /usr/local/src/scripts/aliases.json] \
           --external babelify/polyfill \
           --external react \
           --external svg4everybody \
| $uglify \
> /usr/local/src/public/js/app.js
