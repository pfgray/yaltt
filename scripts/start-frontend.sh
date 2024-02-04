#!/usr/bin/env bash

pnpm install --frozen-lockfile
pnpm build "@yaltt/frontend"
pnpm run --filter "@yaltt/frontend" start