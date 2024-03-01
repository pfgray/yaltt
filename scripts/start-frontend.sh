#!/usr/bin/env bash

gbt build "@yaltt/frontend"
/app/result/bin/pnpm run --filter "@yaltt/frontend" start