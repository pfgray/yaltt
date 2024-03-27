/* eslint-disable @typescript-eslint/no-explicit-any */
import { Either, ReadonlyArray, pipe } from "effect";
import * as S from "@effect/schema/Schema";

export type QuerySchema<A> = {
  _tag: "Array" | "Single" | "Optional";
  schema: S.Schema<A, string, never>;
};

export const QP = {
  array: <A>(schema: S.Schema<A, string, never>) => ({
    _tag: "Array" as const,
    schema,
  }),
  single: <A>(schema: S.Schema<A, string, never>) => ({
    _tag: "Single" as const,
    schema,
  }),
  optional: <A>(schema: S.Schema<A, string, never>) => ({
    _tag: "Optional" as const,
    schema,
  }),
};
