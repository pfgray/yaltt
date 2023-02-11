import { EffectTypeId } from "@effect/io/Effect";
import * as pg from "pg";
import { PgService } from "./PgService";
import * as Eff from "@effect/io/Effect";
import { pipe } from "@fp-ts/core/Function";

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
          Eff.async<never, Error, unknown>((resume) => {
            if (!begun) {
              begun = true;
              pool.query("begin", (err, res) => {
                if (err) {
                  resume(Eff.fail(err));
                } else {
                  resume(Eff.succeed(res));
                }
              });
            } else {
              resume(Eff.succeed({}));
            }
          }),
          Eff.flatMap(() =>
            Eff.async<never, Error, pg.QueryResult<{}>>((resume) => {
              pool.query(query, values, (err, res) => {
                if (err) {
                  resume(Eff.fail(err));
                } else {
                  resume(Eff.succeed(res));
                }
              });
            })
          )
        ),
    },
  };
};
