import { isoStringDate, User } from "@yaltt/model";
import * as S from "@fp-ts/schema";
import { query, query1 } from "../../db/db";
import { pipe } from "@fp-ts/core/Function";
import * as Eff from "@effect/io/Effect";
import { createKeyForAppId } from "./keys";

const SimpleAppRow = S.struct({
  id: S.number,
  name: S.string,
  user_id: S.number,
});

export const getAppForId = (appId: number) =>
  query1(SimpleAppRow)("select id, name, user_id from apps where id = $1", [
    appId,
  ]);

export const getAppsForUser = (u: User) =>
  query(SimpleAppRow)("select id, name, user_id from apps where user_id = $1", [
    u.id,
  ]);

export const AppRow = pipe(
  SimpleAppRow,
  S.extend(
    S.struct({
      created: S.date,
      modified: S.date,
      icon_url: S.union(S.string, S.null),
    })
  )
);

export const createAppForUser = (name: string, u: User) =>
  Eff.tap(
    query1(AppRow)(
      "insert into apps (name, user_id) values ($1, $2) returning *",
      [name, u.id]
    ),
    (app) => createKeyForAppId(app.id)
  );
