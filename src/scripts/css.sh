#!/bin/bash
set -e

echo "Compiling CSS..."

base="/home/ustwo"
input="$base/src/app/index.scss"
filename="$base/public/css/index.css"

mkdir -p $base/public/css

if [[ "$VERBOSE" == "true" ]]; then
  sassc_opts="--sourcemap --line-comments --style nested"
else
  sassc_opts="--style compressed"
fi

sassc $input \
      --load-path $base/src/app/components \
      --load-path $base/src/app/libs \
      $sassc_opts \
      $filename

babel-node $base/src/scripts/postcss.js $filename

echo "Done with CSS"
