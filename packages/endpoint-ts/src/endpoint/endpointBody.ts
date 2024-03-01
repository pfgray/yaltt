import * as S from "@effect/schema/Schema";
import { TagADT } from "../tag";

export type EndpointBody<S extends S.Schema<any, any, never>> = TagADT<{
  json: { schema: S };
  empty: {};
}>;

export const Body = {
  json: <S extends S.Schema<any, any, never>>(schema: S): EndpointBody<S> => ({
    _tag: "json",
    schema,
  }),
  empty: {
    _tag: "empty" as const,
  },
};

export type BodyTypeFromBody<
  S extends S.Schema<any, any, never>,
  B extends EndpointBody<any>
> = B extends { _tag: "json" }
  ? S.Schema.To<S>
  : B extends { _tag: "empty" }
  ? never
  : never;
