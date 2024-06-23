import * as pg from "pg";

import * as S from "@effect/schema/Schema";
import { DecodeError, decode } from "@yaltt/model";
import { Effect, Option, ReadonlyArray, pipe } from "effect";
import { flow } from "effect/Function";
import { Query } from "./QueryService";

export const pool: pg.Pool = new ((pg as any).default as any).Pool();

export interface PgError {
  _tag: "pg_error";
  cause: Error;
  query: string;
}

export const pgError = (cause: Error, query: string): PgError => ({
  _tag: "pg_error",
  cause,
  query,
});

export interface DecodeQueryError {
  _tag: "decode_query_error";
  query: string;
  error: DecodeError;
}

export const decodeQueryError = (
  error: DecodeError,
  query: string
): DecodeQueryError => ({
  _tag: "decode_query_error",
  error,
  query,
});

export interface DataIntegrityError {
  _tag: "data_integrity_error";
  message: string;
}

export const dataIntegrityError = (message: string): DataIntegrityError => ({
  _tag: "data_integrity_error",
  message,
});

const query_ =
  <T>(schema: S.Schema<T, any>) =>
  (queryStr: string, queryParams: unknown[]) => {
    const arraySchema: S.Schema<readonly T[], any, never> = S.array(schema);
    return pipe(
      Query.query(queryStr, queryParams),
      Effect.map((result) => result.rows),
      Effect.mapError((cause) => pgError(cause, queryStr)),
      decode(arraySchema),
      Effect.catchTag("decode_error", (error) =>
        Effect.fail(decodeQueryError(error, queryStr))
      ),
      Effect.map((result) => [queryStr, result] as const)
    );
  };

export const query = <T>(schema: S.Schema<T, any>) =>
  flow(
    query_(schema),
    Effect.map(([, a]) => a)
  );

export interface NoRecordFound {
  _tag: "no_record_found";
  query: string;
}

export const query1 = <T>(schema: S.Schema<T, any>) =>
  flow(
    query_(schema),
    Effect.flatMap(([query, rows]) =>
      pipe(
        rows,
        ReadonlyArray.match({
          onEmpty: () =>
            Effect.fail<NoRecordFound>({ _tag: "no_record_found", query }),
          onNonEmpty: ([head]) => Effect.succeed(head),
        })
      )
    )
  );

/**
 * Converts an effect that can fail with "no record found" to
 * instead succeed with Option.none
 * @param eff
 * @returns
 */
export const toOption = <A, E extends { _tag: string }, R>(
  eff: Effect.Effect<A, E, R>
): Effect.Effect<
  Option.Option<A>,
  Exclude<E, { _tag: "no_record_found" }>,
  R
> =>
  pipe(
    eff,
    Effect.map(Option.some),
    Effect.catchTag("no_record_found" as any, () =>
      Effect.succeed(Option.none<A>())
    )
  ) as any;

export const queryOp1 = <T>(schema: S.Schema<T, any>) =>
  flow(
    query_(schema),
    Effect.map(([query, rows]) =>
      pipe(
        rows,
        ReadonlyArray.match({
          onEmpty: () => Option.none<T>(),
          onNonEmpty: ReadonlyArray.head,
        })
      )
    )
  );
