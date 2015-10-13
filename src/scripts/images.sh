#!/bin/sh
set -e

echo "Processing images..."

base="/home/ustwo"

if [[ "$VERBOSE" == "true" ]]; then
  rsync_verbose="-v"
fi

mkdir -p $base/public/images

rsync -r \
      $rsync_verbose \
      $base/src/app/images/ \
      $base/public/images/

echo "Done processing images..."
