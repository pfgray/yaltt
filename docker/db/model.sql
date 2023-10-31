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
  title           varchar(255),
  type            text[] not null default array[]::text[],
  label           varchar(255),
  registration_id serial not null references registrations(id)
);

create table if not exists people (
  id              serial primary key,
  created         date not null default now(),
  sub             varchar(255) not null,
  name            varchar(255),
  given_name      varchar(255),
  family_name     varchar(255),
  middle_name     varchar(255),
  email           varchar(255),
  locale          varchar(255),
  registration_id serial not null references registrations(id)
);

create table if not exists launches (
  id              serial primary key,
  created         date not null default now(),
  id_token        jsonb not null,
  registration_id serial not null references registrations(id),
  person_id       serial references people(id),
  context_id      serial references contexts(id)
);

create table if not exists enrollments (
  id              serial primary key,
  created         date not null default now(),
  person_id       serial not null references people(id) on delete cascade,
  context_id      serial not null references contexts(id) on delete cascade,
  roles           text[] not null default array[]::text[]
);

create table if not exists registrations (
  id                      serial primary key,
  type                    varchar(255) not null,
  created                 date not null default now(),
  app_id                  serial not null references apps(id) on delete cascade,
  claims                  text[] not null default array[]::text[],
  scopes                  text[] not null default array[]::text[],
  custom_parameters       jsonb not null default '{}'::jsonb,
  platform_configuration  jsonb not null
);

create table if not exists jwks (
  id                      serial primary key,
  created                 date not null default now(),
  active                  boolean not null default true,
  registration_id         serial not null references registrations(id) on delete cascade,
  private_key             bytea not null,
  public_key              bytea not null
);