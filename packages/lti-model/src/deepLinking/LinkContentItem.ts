import * as S from "@effect/schema/Schema";

export const LinkContentItem = S.struct({
  type: S.literal("link"),
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
  embed: S.optional(
    S.struct({
      html: S.string,
    })
  ),
  window: S.optional(
    S.struct({
      targetName: S.string,
      width: S.optional(S.number),
      height: S.optional(S.number),
      windowFeatures: S.optional(S.string),
    })
  ),
  iframe: S.optional(
    S.struct({
      width: S.optional(S.number),
      height: S.optional(S.number),
    })
  ),
});

export interface LinkContentItem extends S.To<typeof LinkContentItem> {}
