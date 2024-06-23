import * as S from "@effect/schema/Schema";

export const GoogleProfile = S.struct({
  id: S.string,
  displayName: S.string,
  email: S.string,
  picture: S.string,
});

export type GoogleProfile = S.Schema.To<typeof GoogleProfile>;
