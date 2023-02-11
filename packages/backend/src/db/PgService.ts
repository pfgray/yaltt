import * as pg from "pg";

import * as Eff from "@effect/io/Effect";
import * as Context from "@fp-ts/data/Context";

export interface PgService {
  query: (
    query: string,
    values: unknown[]
  ) => Eff.Effect<never, Error, pg.QueryResult<{}>>;
}

export const PgService = Context.Tag<PgService>();
