import * as pg from "pg";

import * as Eff from "@effect/io/Effect";
import * as S from "@fp-ts/schema/Schema";
import * as P from "@fp-ts/schema/Parser";
import * as PE from "@fp-ts/schema/ParseError";

import { flow, pipe } from "@fp-ts/data/Function";
import * as E from "@fp-ts/data/Either";
import * as RA from "@fp-ts/data/ReadonlyArray";

export const pool: pg.Pool = new ((pg as any).default as any).Pool();

export interface PgError {
  tag: "pg_error";
  cause: Error;
  query: string;
}

export interface DecodeError {
  tag: "decode_error";
  query: string;
  actual: unknown[];
  errors: RA.NonEmptyReadonlyArray<PE.ParseError>;
}

const query_ =
  <T>(schema: S.Schema<T>) =>
  (query: string, values: unknown[]) =>
    pipe(
      Eff.async<never, Error, [string, pg.QueryResult<{}>]>((resume) => {
        pool.query(query, values, (err, res) => {
          if (err) {
            resume(Eff.fail(err));
          } else {
            resume(Eff.succeed([query, res]));
          }
        });
      }),
      Eff.mapError((cause): PgError => ({ tag: "pg_error", cause, query })),
      Eff.flatMap(([query, { rows }]) =>
        pipe(
          rows,
          P.decode(S.array(schema)),
          E.match(
            (errors) =>
              Eff.fail<DecodeError>({
                tag: "decode_error",
                errors,
                actual: rows,
                query,
              }),
            (decoded) => Eff.succeed([query, decoded] as const)
          )
        )
      )
    );

export const query = <T>(schema: S.Schema<T>) =>
  flow(
    query_(schema),
    Eff.map(([, a]) => a)
  );

export interface NoRecordFound {
  tag: "no_record_found";
  query: string;
}

export const query1 = <T>(schema: S.Schema<T>) =>
  flow(
    query_(schema),
    Eff.flatMap(([query, rows]) =>
      pipe(
        rows,
        RA.match(
          () => Eff.fail<NoRecordFound>({ tag: "no_record_found", query }),
          Eff.succeed
        )
      )
    )
  );
