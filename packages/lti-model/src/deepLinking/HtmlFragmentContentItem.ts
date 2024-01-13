import * as S from "@effect/schema/Schema";

export const HtmlFragmentContentItem = S.struct({
  type: S.literal("html"),
  html: S.string,
  title: S.optional(S.string),
  text: S.optional(S.string),
});

export interface HtmlFragmentContentItem
  extends S.To<typeof HtmlFragmentContentItem> {}
