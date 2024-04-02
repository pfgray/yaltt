import { Effect, Either, pipe } from "effect";
import * as S from "@effect/schema/Schema";
import { ParseError } from "@effect/schema/ParseResult";
import { ParseOptions } from "@effect/schema/AST";

export interface EncodeError {
  _tag: "encode_error";
  actual: unknown;
  error: ParseError;
}

const encodeOptions: ParseOptions = { onExcessProperty: "ignore" };

export const encode = <A>(schema: S.Schema<A, any>) =>
  Effect.flatMap(
    (data: A): Effect.Effect<unknown, EncodeError, never> =>
      pipe(
        data,
        S.encode(schema, encodeOptions),
        Effect.mapError(encodeError(data))
      )
  );

export const encodeOption =
  <A>(schema: S.Schema<A, any>) =>
  (data: A) =>
    pipe(data, S.encodeOption(schema, encodeOptions));

export const encodeEither =
  <A>(schema: S.Schema<A, any>) =>
  (data: A) =>
    pipe(
      data,
      S.encodeEither(schema, encodeOptions),
      Either.mapLeft(encodeError(data))
    );

export const encodeError =
  (actual: unknown) =>
  (error: ParseError): EncodeError => ({
    _tag: "encode_error",
    error,
    actual,
  });
