import { User } from "@yaltt/model";
import * as S from "@fp-ts/schema";
import { query, query1 } from "../../db/db";
import { pipe } from "@fp-ts/core/Function";
import * as Eff from "@effect/io/Effect";

const AppRow = S.struct({
  id: S.number,
  name: S.string,
  user_id: S.number,
});

export const getAppsForUser = (u: User) =>
  query(AppRow)("select id, name, user_id from apps where user_id = $1", [
    u.id,
  ]);

export const createAppForUser = (name: string, u: User) =>
  query1(AppRow)(
    "insert into apps (name, user_id) values ($1, $2) returning *",
    [name, u.id]
  );
