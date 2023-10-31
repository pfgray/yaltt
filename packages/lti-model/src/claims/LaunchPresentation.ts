import * as S from "@effect/schema/Schema";

export const LaunchPresentationClaim = S.struct({
  "https://purl.imsglobal.org/spec/lti/claim/launch_presentation": S.optional(
    S.struct({
      document_target: S.optional(S.string),
      height: S.optional(S.union(S.string, S.number)),
      width: S.optional(S.union(S.string, S.number)),
      return_url: S.optional(S.string),
      locale: S.optional(S.string),
    })
  ),
});
