import * as S from "@effect/schema/Schema";

export const PublicJwk = S.struct({
  kty: S.string,
  use: S.string,
  kid: S.string,
  e: S.string,
  n: S.string,
});

export interface PublicJwk extends S.Schema.To<typeof PublicJwk> {}
