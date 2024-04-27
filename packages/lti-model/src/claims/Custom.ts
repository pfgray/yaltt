import * as S from "@effect/schema/Schema";

export const CustomClaim = S.struct({
  "https://purl.imsglobal.org/spec/lti/claim/custom": S.optional(
    S.record(S.string, S.union(S.string, S.null))
  ),
});
