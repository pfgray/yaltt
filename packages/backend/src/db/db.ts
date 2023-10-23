import * as pg from "pg";

import { pipe, Effect, Option, Either, ReadonlyArray } from "effect";
import * as S from "@effect/schema/Schema";
import { PgService } from "./PgService";
import { ParseError } from "@effect/schema/ParseResult";
import { flow } from "effect/Function";

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
  error: ParseError;
}

const query_ =
  <T>(schema: S.Schema<any, T>) =>
  (queryStr: string, queryParams: unknown[]) =>
    PgService.pipe(
      Effect.flatMap(({ query }) => query(queryStr, queryParams)),
      Effect.map((result) => [queryStr, result] as const),
      Effect.mapError(
        (cause): PgError => ({ tag: "pg_error", cause, query: queryStr })
      ),
      Effect.flatMap(([query, { rows }]) =>
        pipe(
          rows,
          S.parse(S.array(schema)),
          Effect.mapError(
            (error): DecodeError => ({
              tag: "decode_error",
              error,
              actual: rows,
              query,
            })
          ),
          Effect.map((decoded) => [query, decoded] as const)
        )
      )
    );

export const query = <T>(schema: S.Schema<any, T>) =>
  flow(
    query_(schema),
    Effect.map(([, a]) => a)
  );

export interface NoRecordFound {
  tag: "no_record_found";
  query: string;
}

export const query1 = <T>(schema: S.Schema<any, T>) =>
  flow(
    query_(schema),
    Effect.flatMap(([query, rows]) =>
      pipe(
        rows,
        ReadonlyArray.match({
          onEmpty: () =>
            Effect.fail<NoRecordFound>({ tag: "no_record_found", query }),
          onNonEmpty: ([head]) => Effect.succeed(head),
        })
      )
    )
  );
