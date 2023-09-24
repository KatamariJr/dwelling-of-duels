#!/usr/bin/env bash

cd dodarchive
for dir in */; do
    echo $dir
    ( cd "$dir" && rm "${dir%/}".zip )
    ( cd "$dir" && zip -r "${dir%/}".zip . )
done