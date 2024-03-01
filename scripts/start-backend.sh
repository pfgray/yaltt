#!/usr/bin/env bash

echo "path is: $PATH"
echo "starting backend"
ls -al /app/result/bin
/app/result/bin/pnpm run --filter "@yaltt/backend" start