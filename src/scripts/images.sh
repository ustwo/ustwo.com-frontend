#!/bin/bash
set -e

echo "Processing images..."

base="/home/ustwo"

if [[ "$VERBOSE" == "true" ]]; then
  rsync_verbose="-v"
fi

rsync -r \
      $rsync_verbose \
      $base/src/app/images \
      $base/public

echo "Done processing images..."
