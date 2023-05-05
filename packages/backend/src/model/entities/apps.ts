import { User } from "@yaltt/model";
import * as S from "@effect/schema/Schema";
import { query, query1 } from "../../db/db";

const AppRow = S.struct({
  id: S.number,
  name: S.string,
  user_id: S.number,
  created: S.ValidDateFromSelf,
  modified: S.ValidDateFromSelf,
  icon_url: S.union(S.string, S.null),
});

export const getAppForId = (appId: number) =>
  query1(AppRow)(
    "select id, name, user_id, created, modified, icon_url from apps where id = $1",
    [appId]
  );

export const getAppsForUser = (u: User) =>
  query(AppRow)(
    "select id, name, user_id, created, modified, icon_url from apps where user_id = $1",
    [u.id]
  );

export const createAppForUser = (name: string, u: User) =>
  query1(AppRow)(
    "insert into apps (name, user_id) values ($1, $2) returning *",
    [name, u.id]
  );
