FROM jarredsumner/bun:0.5.0

RUN mkdir -p /app/packages/{backend|frontend}

COPY ../../app/packages/frontend/package.json /app/packages/frontend/
COPY ../../app/packages/backend/package.json /app/packages/backend/
COPY ../../package.json /app/
COPY ../../yarn.lock /app/

RUN yarn install

RUN COPY ../../ /app
