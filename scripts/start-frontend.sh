#!/usr/bin/env bash

gbt build "@yaltt/frontend"
pnpm run --filter "@yaltt/frontend" start