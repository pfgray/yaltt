import * as S from "@effect/schema/Schema";

export const RoleScopeMentorClaim = S.struct({
  "https://purl.imsglobal.org/spec/lti/claim/role_scope_mentor": S.optional(
    S.array(S.string)
  ),
});
