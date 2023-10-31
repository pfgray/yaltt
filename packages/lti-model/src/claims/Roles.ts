import * as S from "@effect/schema/Schema";

export const RolesClaim = S.struct({
  "https://purl.imsglobal.org/spec/lti/claim/roles": S.array(S.string),
});
