#!/bin/bash

rm -r "./classes"
./update_commands.sh
tsc "src/test.ts" --outDir "classes"