#!/bin/sh
set -e

echo "Compiling CSS..."

base="/home/ustwo"
input="$base/src/app/index.scss"
filename="$base/public/css/index.css"

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

postcss --use autoprefixer \
        --autoprefixer.browser "last 2 versions" \
        --output $filename \
        $filename

echo "Done with CSS"
