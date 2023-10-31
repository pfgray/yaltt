import * as S from "@effect/schema/Schema";

export const LtiVersionClaim = S.struct({
  "https://purl.imsglobal.org/spec/lti/claim/version": S.string,
});
