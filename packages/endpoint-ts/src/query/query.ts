/* eslint-disable @typescript-eslint/no-explicit-any */
import { Either, ReadonlyArray, pipe } from "effect";
import * as S from "@effect/schema/Schema";

export type QueryCodec<A> = S.Schema<A, string>;

type Query<Schemas extends Record<string, S.Schema<any, string, never>>> =
  Schemas;

export const query = <
  Schemas extends Record<string, S.Schema<any, string, never>>
>(
  schemas: Schemas
) => schemas;

query({
  foo: S.string,
  bar: S.NumberFromString,
  baz: S.DateFromString,
});
