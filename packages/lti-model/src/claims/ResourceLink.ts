import * as S from "@effect/schema/Schema";

export const ResourceLinkClaim = S.struct({
  "https://purl.imsglobal.org/spec/lti/claim/resource_link": S.struct({
    id: S.string,
    description: S.optional(S.optionFromNullable(S.string)),
    title: S.optional(S.optionFromNullable(S.string)),
  }),
});
