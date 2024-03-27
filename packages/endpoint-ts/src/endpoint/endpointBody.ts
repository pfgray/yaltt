import * as S from "@effect/schema/Schema";
import { TagADT, TagADTMember } from "../tag";

export type EndpointBody<S extends S.Schema<any, any, never>> = TagADT<{
  json: { schema: S };
  empty: {};
}>;

export type EndpointBodyJson<S extends S.Schema<any, any, never>> =
  TagADTMember<"json", EndpointBody<S>>;

export const Body = {
  json: <S extends S.Schema<any, any, never>>(
    schema: S
  ): EndpointBodyJson<S> => ({
    _tag: "json" as const,
    schema,
  }),
  empty: {
    _tag: "empty" as const,
  },
};

export type BodyTypeFromBody<B extends EndpointBody<any>> = B extends {
  _tag: "json";
}
  ? S.Schema.To<B["schema"]>
  : B extends { _tag: "empty" }
  ? never
  : never;
