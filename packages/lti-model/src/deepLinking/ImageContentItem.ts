import * as S from "@effect/schema/Schema";

export const ImageContentItem = S.struct({
  type: S.literal("image"),
  url: S.string,
  title: S.optional(S.string),
  text: S.optional(S.string),
  icon: S.optional(
    S.struct({
      url: S.string,
      width: S.optional(S.number),
      height: S.optional(S.number),
    })
  ),
  thumbnail: S.optional(
    S.struct({
      url: S.string,
      width: S.optional(S.number),
      height: S.optional(S.number),
    })
  ),
  width: S.optional(S.number),
  height: S.optional(S.number),
});

export interface ImageContentItem
  extends S.Schema.To<typeof ImageContentItem> {}
