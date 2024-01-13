import * as S from "@effect/schema/Schema";

export const LtiResourceLinkContentItem = S.struct({
  type: S.literal("ltiResourceLink"),
  url: S.optional(S.string),
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
  custom: S.optional(S.record(S.string, S.string)),
  lineItem: S.optional(
    S.struct({
      label: S.optional(S.string),
      scoreMaximum: S.number,
      resourceId: S.optional(S.string),
      tag: S.optional(S.string),
      gradesReleased: S.optional(S.boolean),
    })
  ),
  available: S.optional(
    S.struct({
      startDateTime: S.optional(S.string),
      endDateTime: S.optional(S.string),
    })
  ),
  submission: S.optional(
    S.struct({
      startDateTime: S.optional(S.string),
      endDateTime: S.optional(S.string),
    })
  ),
});

export interface LtiResourceLinkContentItem
  extends S.To<typeof LtiResourceLinkContentItem> {}
