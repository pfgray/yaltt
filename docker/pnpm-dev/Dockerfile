FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack@0.32.0
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
