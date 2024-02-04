#!/usr/bin/env bash

pnpm install --frozen-lockfile
pnpm build "@yaltt/backend"
pnpm run --filter "@yaltt/backend" start