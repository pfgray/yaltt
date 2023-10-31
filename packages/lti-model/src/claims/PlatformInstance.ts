import * as S from "@effect/schema/Schema";

export const PlatformInstanceClaim = S.struct({
  "https://purl.imsglobal.org/spec/lti/claim/tool_platform": S.optional(
    S.struct({
      guid: S.string,
      contact_email: S.optional(S.string),
      description: S.optional(S.string),
      name: S.optional(S.string),
      url: S.optional(S.string),
      product_family_code: S.optional(S.string),
      version: S.optional(S.string),
    })
  ),
});
