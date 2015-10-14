#!/bin/sh
set -e

echo "Compiling CSS..."

base="/home/ustwo"
input="$base/src/app/index.scss"
filename="$base/public/css/index.css"
fontinput="$base/src/app/lib/font.scss"
fontfilename="$base/public/css/font.css"

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

sassc $fontinput \
      --style compressed \
      $fontfilename

echo "Done with CSS"
