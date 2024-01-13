import * as S from "@effect/schema/Schema";
import { extractClaim } from "./extractClaim";
import { ContentItem } from "../deepLinking/ContentItem";

export const ContentItemsClaimKey =
  "https://purl.imsglobal.org/spec/lti-dl/claim/content_items";

export const ContentItemsClaim = S.struct({
  [ContentItemsClaimKey]: S.array(ContentItem),
});

export const extractContentItemsClaim = extractClaim(
  ContentItemsClaim,
  ContentItemsClaimKey
);
