import * as S from "@effect/schema/Schema";

export const Submission = S.struct({
  startedAt: S.optional(S.DateFromString),
  submittedAt: S.optional(S.DateFromString),
});

export type Submission = S.Schema.To<typeof Submission>;
