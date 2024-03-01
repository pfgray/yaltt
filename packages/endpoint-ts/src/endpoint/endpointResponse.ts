import * as S from "@effect/schema/Schema";
import { TagADT, TagADTMember } from "../tag";

export type EndpointResponse<S extends S.Schema<any, any, never>> = TagADT<{
  json: { schema: S };
  text: {};
}>;

const jsonResponse = <S extends S.Schema<any, any, never>>(
  schema: S
): TagADTMember<"json", EndpointResponse<S>> => ({
  _tag: "json" as const,
  schema,
});

const textResponse: TagADTMember<"text", EndpointResponse<never>> = {
  _tag: "text" as const,
};

export const Response = {
  json: jsonResponse,
  text: textResponse,
};

export type ResponseTypeFromResponse<
  S extends S.Schema<any, any, never>,
  B extends EndpointResponse<any>
> = B extends { _tag: "text" }
  ? string
  : B extends { _tag: "json" }
  ? S.Schema.To<S>
  : never;
