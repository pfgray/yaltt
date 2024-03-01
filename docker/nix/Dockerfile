# Nix builder
FROM nixos/nix:latest AS builder

# Copy our source and setup our working dir.
COPY . /app
WORKDIR /app

# Build our Nix environment
RUN nix --extra-experimental-features "nix-command flakes" \
  --option filter-syscalls false \
  build .

RUN mkdir /tmp/nix-store-closure
RUN cp -R $(nix-store -qR result/) /tmp/nix-store-closure

ENV PATH="${PATH}:/app/result/bin"

FROM builder AS deps
RUN pnpm install --frozen-lockfile

FROM deps AS frontend
COPY --from=builder /tmp/nix-store-closure /nix/store
COPY --from=builder /app/result /app/result
RUN gbt build @yaltt/frontend
EXPOSE 80
CMD [ "pnpm", "dev" ]

FROM deps AS backend
COPY --from=builder /tmp/nix-store-closure /nix/store
COPY --from=builder /app/result /app/result
RUN gbt build @yaltt/backend
EXPOSE 3000
CMD [ "pnpm", "start" ]