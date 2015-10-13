#!/bin/sh
set -e

echo "Processing images..."

base="/home/ustwo"

mkdir -p $base/public/images

rsync -rv \
      $base/src/app/images/ \
      $base/public/images/

echo "Done processing images..."
