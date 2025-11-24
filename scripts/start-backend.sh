#!/usr/bin/env bash

echo "starting backend"
exec pnpm run --filter "@yaltt/backend" start
