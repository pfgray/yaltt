import * as S from "@effect/schema/Schema";

export const DeepLinkingSettingsClaim = S.struct({
  "https://purl.imsglobal.org/spec/lti-dl/claim/deep_linking_settings":
    S.struct({
      accept_types: S.array(S.string),
      auto_create: S.boolean,
      accept_multiple: S.optional(S.boolean),
      accept_lineitem: S.optional(S.boolean),
      accept_media_types: S.optional(S.string),
      accept_presentation_document_targets: S.array(S.string),
      deep_link_return_url: S.string,
      title: S.optional(S.string),
      text: S.optional(S.string),
      data: S.optional(S.unknown),
    }),
});
