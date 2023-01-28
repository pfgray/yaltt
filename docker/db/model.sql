create table if not exists users (
  id              serial primary key,
  logins          jsonb not null
);

create table if not exists password_logins (
  user_id         serial not null references users(id),
  username        varchar(255) not null unique,
  hashed_password bytea not null,
  salt            bytea not null
);

create table if not exists vendor (
  id              serial primary key,
  name            varchar(255) not null,
  user_id         serial references users(id)
);

create table if not exists app (
  id              serial primary key,
  name            varchar(255) not null,
  icon_url        varchar(255),
  vendor_id       serial references vendor(id)
);

