import * as S from "@effect/schema/Schema";

export const ContextClaim = S.struct({
  "https://purl.imsglobal.org/spec/lti/claim/context": S.optional(
    S.struct({
      id: S.string,
      type: S.optional(S.array(S.string)),
      label: S.optional(S.string),
      title: S.optional(S.string),
    })
  ),
});
