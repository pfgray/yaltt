import * as S from "@effect/schema/Schema";

export const LisClaim = S.struct({
  "https://purl.imsglobal.org/spec/lti/claim/lis": S.optional(
    S.struct({
      person_sourcedid: S.optional(S.string),
      course_offering_sourcedid: S.optional(S.string),
      course_section_sourcedid: S.optional(S.string),
    })
  ),
});
