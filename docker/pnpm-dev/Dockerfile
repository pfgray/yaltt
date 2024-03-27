FROM node:18.18.2 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS deps
RUN pnpm install --frozen-lockfile

FROM deps AS frontend
RUN pnpm build @yaltt/frontend
EXPOSE 80
CMD [ "pnpm", "dev" ]

FROM deps AS backend
RUN pnpm build @yaltt/backend
EXPOSE 3000
CMD [ "pnpm", "start" ]
