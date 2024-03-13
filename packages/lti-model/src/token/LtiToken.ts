import * as S from "@effect/schema/Schema";

export const LtiToken = S.struct({
  access_token: S.string,
  token_type: S.string,
  expires_in: S.number,
  scope: S.string,
});

export interface LtiToken extends S.Schema.To<typeof LtiToken> {}
