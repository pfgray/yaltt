create table if not exists users (
  id              serial primary key,
  created         date not null default now(),
  logins          jsonb not null
);

create table if not exists password_logins (
  user_id         serial not null references users(id),
  username        varchar(255) not null unique,
  hashed_password bytea not null,
  salt            bytea not null
);

create table if not exists apps (
  id              serial primary key,
  created         date not null default now(),
  modified        date not null default now(),
  name            varchar(255) not null,
  icon_url        varchar(255),
  user_id         serial references users(id)
);

create table if not exists contexts (
  id              serial primary key,
  created         date not null default now(),
  name            varchar(255) not null,
  icon_url        varchar(255),
  user_id         serial references users(id)
);

create table if not exists people (
  id              serial primary key,
  created         date not null default now(),
  name            varchar(255) not null
);

create table if not exists launches (
  id              serial primary key,
  created         date not null default now(),
  name            varchar(255) not null,
  id_token        jsonb not null,
  person_id       serial references people(id),
  context         serial references contexts(id)
);

create table if not exists launches (
  id              serial primary key,
  created         date not null default now(),
  name            varchar(255) not null,
  id_token        jsonb not null,
  person_id       serial references people(id),
  context         serial references contexts(id)
);

create table if not exists registrations (
  id                      serial primary key,
  created                 date not null default now(),
  app_id                  serial not null references apps(id),
  tool_configuration      jsonb not null,
  platform_configuration  jsonb not null
);