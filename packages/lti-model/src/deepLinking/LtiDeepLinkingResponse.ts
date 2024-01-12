import * as S from "@effect/schema/Schema";
import { FileContentItem } from "./FileContentItem";
import { HtmlFragmentContentItem } from "./HtmlFragmentContentItem";
import { ImageContentItem } from "./ImageContentItem";
import { LinkContentItem } from "./LinkContentItem";
import { LtiResourceLinkContentItem } from "./LtiResourceLinkContentItem";

export const LtiDeepLinkingResponse = S.struct({
  aud: S.string,
  "https://purl.imsglobal.org/spec/lti/claim/message_type": S.literal(
    "LtiDeepLinkingResponse"
  ),
  "https://purl.imsglobal.org/spec/lti/claim/version": S.literal("1.3.0"),
  "https://purl.imsglobal.org/spec/lti/claim/deployment_id": S.string,
  "https://purl.imsglobal.org/spec/lti-dl/claim/data": S.optional(S.string),
  "https://purl.imsglobal.org/spec/lti-dl/claim/msg": S.optional(S.string),
  "https://purl.imsglobal.org/spec/lti-dl/claim/log": S.optional(S.string),
  "https://purl.imsglobal.org/spec/lti-dl/claim/errormsg": S.optional(S.string),
  "https://purl.imsglobal.org/spec/lti-dl/claim/errorlog": S.optional(S.string),
  "https://purl.imsglobal.org/spec/lti-dl/claim/content_items": S.optional(
    S.array(
      S.union(
        FileContentItem,
        HtmlFragmentContentItem,
        ImageContentItem,
        LinkContentItem,
        LtiResourceLinkContentItem
      )
    )
  ),
});
