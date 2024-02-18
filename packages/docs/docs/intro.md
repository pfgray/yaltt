---
sidebar_position: 1
slug: /
---

# Introduction

Yaltt is an LTI test tool that is meant to be installed into an LTI platform for testing & debugging.

## Getting Started

There are two main ways to use Yaltt: using the hosted version available on the internet ([https://yaltt.paulgray.net](https://yaltt.paulgray.net)), or running a development version locally with docker.

### Hosted

You can use the hosted version of Yaltt at https://yaltt.paulgray.net, which is free to use. This is useful for testing another hosted platform.
You can use a google account to log in.

Yaltt is currently in a "testing" phase, so access must be granted manually. If interested, send an email to `paul.gray@instructure.com` with your google email, you'll be added manually to the list.

### Running Locally

If using Yaltt to test a local LTI platform implementation you're working on, you can clone the repository and run it with docker:

```sh
git clone git@github.com:pfgray/yaltt.git
cd yaltt
echo "COMPOSE_FILE=docker-compose.yml:docker-compose.dev.yml" >> .env
docker compose up -d
```

## Issues

You can report any issues you run into by creating an issue on github: https://github.com/pfgray/yaltt/issues
