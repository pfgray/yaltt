import * as S from "@effect/schema/Schema";

export const RegistrationType = S.union(
  S.literal("manual"),
  S.literal("dynamic"),
  S.literal("lti11")
);

export type RegistrationType = S.Schema.To<typeof RegistrationType>;
