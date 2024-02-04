import * as S from "@effect/schema/Schema";

export const Launch = S.struct({
  id: S.number,
  created: S.Date,
  id_token: S.unknown,
  registration_id: S.number,
  person_id: S.optional(S.number),
  context_id: S.optional(S.number),
  appId: S.number,
});

export interface Launch extends S.To<typeof Launch> {}
