#!/bin/sh
set -e

base="/home/ustwo"
input="$base/src/app/index.scss"
filename="$base/public/css/index.css"

sassc $input \
      --load-path $base/src/app/components \
      --load-path $base/src/app/libs \
      --line-comments \
      --style nested \
      --sourcemap \
      $filename

# .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
