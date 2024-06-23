import * as S from "@effect/schema/Schema";

export const LoginMechanisms = S.struct({
  types: S.array(S.literal("local", "google")),
});

export type LoginMechanisms = S.Schema.To<typeof LoginMechanisms>;
