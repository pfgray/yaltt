import { AppId, DateFromStringOrDate, YalttUser } from "@yaltt/model";
import * as S from "@effect/schema/Schema";
import { query, query1 } from "../../db/db";
import { createRegistrationForAppId } from "./registrations";
import { Effect, pipe } from "effect";
import { PlatformConfiguration } from "lti-model";

const AppRow = S.struct({
  id: AppId,
  name: S.string,
  user_id: S.number,
  created: DateFromStringOrDate,
  modified: DateFromStringOrDate,
  icon_url: S.optionFromNullable(S.string),
});

export const getAppForId = (appId: number) =>
  query1(AppRow)(
    "select id, name, user_id, created, modified, icon_url from apps where id = $1",
    [appId]
  );

export const getAppsForUser = (u: YalttUser) =>
  query(AppRow)(
    "select id, name, user_id, created, modified, icon_url from apps where user_id = $1",
    [u.id]
  );

export const createAppForUser = (name: string, u: YalttUser) =>
  query1(AppRow)(
    "insert into apps (name, user_id) values ($1, $2) returning *",
    [name, u.id]
  );

export const createAppAndRegistrationForUser = (
  name: string,
  u: YalttUser,
  platformConfiguration: PlatformConfiguration,
  claims: ReadonlyArray<string> = [],
  scopes: ReadonlyArray<string> = [],
  client_id?: string
) =>
  pipe(
    Effect.bindTo("app")(createAppForUser(name, u)),
    Effect.bind("registration", ({ app }) =>
      createRegistrationForAppId(
        app.id,
        "dynamic",
        platformConfiguration,
        claims,
        scopes,
        client_id
      )
    )
  );

export const deleteAppForId = (appId: number) =>
  query(S.unknown)("delete from apps where id = $1", [appId]);
