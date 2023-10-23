import { pipe, Effect } from "effect";
import * as pg from "pg";
import { PgService } from "./PgService";

export const mkTransactionalPgService = (
  pool: pg.Pool
): {
  rollback: () => void;
  commit: () => void;
  service: PgService;
} => {
  let begun = false;
  return {
    commit: () => {
      pool.query("commit");
    },
    rollback: () => {
      pool.query("rollback");
    },
    service: {
      query: (query, values) =>
        pipe(
          Effect.async<never, Error, unknown>((resume) => {
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
            Effect.async<never, Error, pg.QueryResult<{}>>((resume) => {
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
    },
  };
};
