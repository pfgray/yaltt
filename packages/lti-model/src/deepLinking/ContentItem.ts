import { FileContentItem } from "./FileContentItem";
import { HtmlFragmentContentItem } from "./HtmlFragmentContentItem";
import { ImageContentItem } from "./ImageContentItem";
import { LinkContentItem } from "./LinkContentItem";
import { LtiResourceLinkContentItem } from "./LtiResourceLinkContentItem";
import * as S from "@effect/schema/Schema";

export const ContentItem = S.union(
  FileContentItem,
  HtmlFragmentContentItem,
  ImageContentItem,
  LinkContentItem,
  LtiResourceLinkContentItem
);

export type ContentItem = S.Schema.To<typeof ContentItem>;
