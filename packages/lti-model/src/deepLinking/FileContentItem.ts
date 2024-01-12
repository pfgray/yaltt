import * as S from "@effect/schema/Schema";

export const FileContentItem = S.struct({
  type: S.literal("file"),
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
  expiresAt: S.optional(S.string),
});
