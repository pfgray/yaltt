import { AppId, YalttUser } from "@yaltt/model";
import * as S from "@effect/schema/Schema";
import { query, query1 } from "../../db/db";

const AppRow = S.struct({
  id: AppId,
  name: S.string,
  user_id: S.number,
  created: S.ValidDateFromSelf,
  modified: S.ValidDateFromSelf,
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

export const deleteAppForId = (appId: number) =>
  query(S.unknown)("delete from apps where id = $1", [appId]);
