FROM node:18 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN pnpm install --frozen-lockfile

FROM prod-deps AS build
RUN pnpm --filter "lti-model" build
RUN pnpm --filter "lti-schema" build
RUN pnpm --filter "canvas-lti-model" build
RUN pnpm --filter "@yaltt/model" build

FROM build AS frontend
WORKDIR /app
EXPOSE 5173
CMD [ "pnpm", "dev" ]

FROM build AS backend
WORKDIR /app
EXPOSE 3000
CMD [ "pnpm", "start" ]
