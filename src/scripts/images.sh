#!/bin/sh
set -e

echo "Processing images..."

base="/home/ustwo"

mkdir -p $base/public/images

cp -rf $base/src/app/images/**/*.{gif,jpg,png,svg} \
       $base/public/images/

cp -rf $base/src/app/images/favicon.{png,ico} \
       $base/public

echo "Done processing images..."
