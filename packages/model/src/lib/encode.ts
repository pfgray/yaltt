import { Effect, pipe } from "effect";
import * as S from "@effect/schema/Schema";
import { ParseError } from "@effect/schema/ParseResult";

export interface EncodeError {
  _tag: "encode_error";
  actual: unknown;
  error: ParseError;
}

export const encode = <A>(schema: S.Schema<A, unknown>) =>
  Effect.flatMap(
    (data: A): Effect.Effect<unknown, EncodeError, never> =>
      pipe(data, S.encode(schema), Effect.mapError(encodeError(data)))
  );

export const encodeOption =
  <A>(schema: S.Schema<A, unknown>) =>
  (data: A) =>
    pipe(data, S.encodeOption(schema));

export const encodeEither =
  <A>(schema: S.Schema<A, unknown>) =>
  (data: A) =>
    pipe(data, S.encodeEither(schema), Effect.mapError(encodeError(data)));

export const encodeError =
  (actual: unknown) =>
  (error: ParseError): EncodeError => ({
    _tag: "encode_error",
    error,
    actual,
  });
