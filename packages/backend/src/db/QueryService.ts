import * as pg from "pg";

import { Context, Effect } from "effect";

export class QueryService extends Context.Tag("QueryService")<
  QueryService,
  {
    query: (
      query: string,
      values: unknown[]
    ) => Effect.Effect<pg.QueryResult<{}>, Error, never>;
  }
>() {}

export const Query = {
  query: (query: string, values: unknown[]) =>
    QueryService.pipe(
      Effect.flatMap((service) => service.query(query, values))
    ),
};
