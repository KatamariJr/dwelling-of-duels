#!/usr/bin/env bash

set -o errexit

cd dodarchive
for dir in */; do
    echo $dir
    ( cd "$dir" && rm -f "${dir%/}".zip )
    ( cd "$dir" && zip -r "${dir%/}".zip . )
done
