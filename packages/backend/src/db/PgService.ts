import * as pg from "pg";

import { pipe, Effect, Option, Either, Context } from "effect";

export interface PgService {
  query: (
    query: string,
    values: unknown[]
  ) => Effect.Effect<never, Error, pg.QueryResult<{}>>;
}

export const PgService = Context.Tag<PgService>();
