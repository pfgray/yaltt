#!/usr/bin/env bash

gbt build "@yaltt/frontend"
exec pnpm run --filter "@yaltt/frontend" start
