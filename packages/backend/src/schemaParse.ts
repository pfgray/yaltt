import { ParseError } from "@effect/schema/ParseResult";
import * as S from "@effect/schema/Schema";
import { Effect, pipe } from "effect";
import { parseBodyError } from "./express/parseBody";

export interface ParserError {
  tag: "parser_error";
  body: unknown;
  error: ParseError;
}

export const parserError =
  (body: unknown) =>
  (error: ParseError): ParserError => ({
    tag: "parser_error",
    body,
    error,
  });

export const schemaParse =
  <A>(schema: S.Schema<any, A>) =>
  (input: unknown) =>
    pipe(
      S.parse(schema)(input, { onExcessProperty: "ignore" }),
      Effect.mapError((error) => parseBodyError(input, error))
    );
