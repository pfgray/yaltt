FROM node:18 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS deps
RUN pnpm install --frozen-lockfile

FROM deps AS web
RUN pnpm build @yaltt/frontend
RUN pnpm build @yaltt/backend
RUN pnpm build @yaltt/docs
WORKDIR /app
EXPOSE 3000

CMD [ "node", "--experimental-specifier-resolution=node", "/app/packages/backend/dist/index.js"]