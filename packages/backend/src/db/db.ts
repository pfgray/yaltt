import * as pg from "pg";

import * as Eff from "@effect/io/Effect";
import * as S from "@fp-ts/schema/Schema";
import * as P from "@fp-ts/schema/Parser";
import * as PE from "@fp-ts/schema/ParseError";

import { flow, pipe } from "@fp-ts/data/Function";
import * as E from "@fp-ts/data/Either";
import { NonEmptyArray, match } from "@fp-ts/data/ReadonlyArray";
export const pool: pg.Pool = new ((pg as any).default as any).Pool();

export interface PgError {
  tag: "pg_error";
  cause: Error;
}

export interface DecodeError {
  tag: "decode_error";
  errors: NonEmptyArray<PE.ParseError>;
}

const query_ = (q: string, values: unknown[]) =>
  pipe(
    Eff.async<never, Error, pg.QueryResult<{}>>((resume) => {
      pool.query(q, values, (err, res) => {
        if (err) {
          resume(Eff.fail(err));
        } else {
          resume(Eff.succeed(res));
        }
      });
    }),
    Eff.mapError((cause): PgError => ({ tag: "pg_error", cause }))
  );

export const query = <T>(schema: S.Schema<T>) =>
  flow(
    query_,
    Eff.flatMap(
      flow(
        (r) => {
          console.log("decoding: ", JSON.stringify(r.rows));
          return r.rows;
        },
        P.decode(S.array(schema)),
        E.match(
          (errors) => Eff.fail({ tag: "decode_error" as const, errors }),
          Eff.succeed
        )
      )
    )
  );

export interface NoRecordFound {
  tag: "no_record_found";
}

export const query1 = <T>(schema: S.Schema<T>) =>
  flow(
    query(schema),
    Eff.flatMap(
      match(
        () => Eff.fail<NoRecordFound>({ tag: "no_record_found" }),
        Eff.succeed
      )
    )
  );

// const query1 = flow(
//   query,
//   TE.flatMap(
//     flow(
//       RA.head,
//       TE.fromOption(() => ({ tag: "error", message: "query returned none" }))
//     )
//   )
// );
