#!/bin/bash
set -e

base="/home/ustwo/src/scripts"

export SHELL=/bin/bash

parallel ::: $base/spa.sh \
             $base/vendors.sh \
             $base/images.sh \
             $base/fonts.sh \
             $base/css.sh
