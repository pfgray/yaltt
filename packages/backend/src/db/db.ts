import * as pg from "pg";

import * as Eff from "@effect/io/Effect";
import * as S from "@fp-ts/schema";
import * as P from "@fp-ts/schema/Parser";
import * as PE from "@fp-ts/schema/ParseResult";

import { flow, pipe } from "@fp-ts/core/Function";
import * as E from "@fp-ts/core/Either";
import * as RA from "@fp-ts/core/ReadonlyArray";
import { PgService } from "./PgService";

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
  (queryStr: string, queryParams: unknown[]) =>
    pipe(
      Eff.serviceWithEffect(PgService, ({ query }) =>
        query(queryStr, queryParams)
      ),
      Eff.map((result) => [queryStr, result] as const),
      Eff.mapError(
        (cause): PgError => ({ tag: "pg_error", cause, query: queryStr })
      ),
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
