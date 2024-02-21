import * as S from "@effect/schema/Schema";

export const RegistrationType = S.union(
  S.literal("manual"),
  S.literal("dynamic")
);

export type RegistrationType = S.Schema.To<typeof RegistrationType>;
