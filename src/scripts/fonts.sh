#!/bin/bash
set -e

echo "Compiling CSS fonts..."

base="/home/ustwo"
input="$base/src/app/lib/font.css"
output="$base/public/css/font.css"

mkdir -p $base/public/css

rsync $input $output

echo "Done with CSS fonts"
