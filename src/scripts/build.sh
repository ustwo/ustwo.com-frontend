#!/bin/sh
set -e

base="/home/ustwo/src/scripts"

parallel ::: $base/spa.sh \
             $base/vendors.sh \
             $base/images.sh \
             $base/fonts.sh \
             $base/css.sh
