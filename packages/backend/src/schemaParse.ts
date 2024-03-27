import { ParseError } from "@effect/schema/ParseResult";
import * as S from "@effect/schema/Schema";
import { Effect, pipe } from "effect";
import { parseBodyError } from "./express/parseBody";

export interface ParserError {
  _tag: "parser_error";
  body: unknown;
  error: ParseError;
}

export const parserError =
  (body: unknown) =>
  (error: ParseError): ParserError => ({
    _tag: "parser_error",
    body,
    error,
  });

export const schemaParse =
  <A>(schema: S.Schema<A, any>) =>
  (input: unknown) =>
    pipe(
      S.decode(schema)(input, { onExcessProperty: "ignore" }),
      Effect.mapError((error) => parseBodyError(input, error))
    );
