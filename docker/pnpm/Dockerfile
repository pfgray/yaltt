FROM node:18 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN pnpm install
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build

FROM base AS lti-model
COPY --from=prod-deps /app/packages/lti-model/node_modules/ /app/packages/lti-model/node_modules
COPY --from=build /app/packages/lti-model/lib /app/packages/lti-model/lib

FROM lti-model AS lti-schema
COPY --from=prod-deps /app/packages/lti-schema/node_modules/ /app/packages/lti-schema/node_modules
COPY --from=build /app/packages/lti-schema/lib /app/packages/lti-schema/lib

FROM lti-schema AS canvas-lti-model
COPY --from=prod-deps /app/packages/canvas-lti-model/node_modules/ /app/packages/canvas-lti-model/node_modules
COPY --from=build /app/packages/canvas-lti-model/lib /app/packages/canvas-lti-model/lib

FROM canvas-lti-model AS yaltt-model
COPY --from=prod-deps /app/packages/model/node_modules/ /app/packages/model/node_modules
COPY --from=build /app/packages/model/lib /app/packages/model/lib

FROM yaltt-model AS frontend
VOLUME /app/node_modules
VOLUME /app/packages/frontend/node_modules
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/packages/frontend/node_modules/ /app/packages/frontend/node_modules
COPY --from=build /app/packages/frontend/dist /app/packages/frontend/dist
WORKDIR /app/packages/frontend
EXPOSE 5173
CMD [ "pnpm", "dev" ]

FROM yaltt-model AS backend
VOLUME /app/node_modules
VOLUME /app/packages/frontend/node_modules
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/packages/backend/node_modules/ /app/packages/backend/node_modules
COPY --from=build /app/packages/backend/lib /app/packages/backend/lib
WORKDIR /app/packages/backend
EXPOSE 3000
CMD [ "pnpm", "start" ]
