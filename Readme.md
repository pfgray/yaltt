# (Yet Another) LTI Test Tool

Yaltt is an LTI test tool that supports:

- [x] Dynamic Registration
- [x] Token Service Auth
- [x] Deep Linking
- [x] Grade Services
- [ ] Post messages
- [ ] Roster Services

## Hosted

You can use the hosted version of Yaltt at https://yaltt.paulgray.net, which is free to use. This is useful for testing another hosted platform.
You can use a google account to log in.

## Running locally

If you just want to run yaltt locally _and not make changes_, you can start yaltt by cloning this repo and running:

```
git clone git@github.com:pfgray/yaltt.git
cd yaltt
echo "COMPOSE_FILE=docker-compose.yml:docker-compose.dev.yml:docker-compose.local.yml" >> .env
docker compose up -d
```

After the containers are up and running, run:

```
pnpm install
pnpm build @yaltt/frontend
pnpm build @yaltt/backend
docker compose restart frontend backend
```

If you're an Instructure engineer using traefik (setup Canvas via inst-cli), then consider including the `docker-compose.instructure.traefik.yml` docker compose file.

## Developing locally

If you want to run yaltt locally _and make changes_, then you should omit the `docker-compose.local.yml` file:

```
git clone git@github.com:pfgray/yaltt.git
cd yaltt
echo "COMPOSE_FILE=docker-compose.yml:docker-compose.dev.yml" >> .env
docker compose up -d
```
