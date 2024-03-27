import { pipe, Effect } from "effect";
import * as pg from "pg";
import { QueryService } from "./QueryService";

export const provideTransactionalPgService = (pool: pg.Pool) => {
  return;
};

export const mkTransactionalPgService = (pool: pg.Pool) => {
  let begun = false;
  return {
    commit: () => {
      pool.query("commit");
    },
    rollback: () => {
      pool.query("rollback");
    },
    provide: Effect.provideService(QueryService, {
      query: (query, values) =>
        pipe(
          Effect.async<unknown, Error, never>((resume) => {
            if (!begun) {
              begun = true;
              pool.query("begin", (err, res) => {
                if (err) {
                  resume(Effect.fail(err));
                } else {
                  resume(Effect.succeed(res));
                }
              });
            } else {
              resume(Effect.succeed({}));
            }
          }),
          Effect.flatMap(() =>
            Effect.async<pg.QueryResult<{}>, Error, never>((resume) => {
              pool.query(query, values, (err, res) => {
                if (err) {
                  resume(Effect.fail(err));
                } else {
                  resume(Effect.succeed(res));
                }
              });
            })
          )
        ),
    }),
  };
};
