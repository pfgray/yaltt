import * as S from "@effect/schema/Schema";
import { App, Registration } from "@yaltt/model";

export const Launch = S.struct({
  id: S.number,
  created: S.Date,
  id_token: S.unknown,
  registration_id: S.number,
  person_id: S.optional(S.number),
  context_id: S.optional(S.number),
  app: App,
  registration: Registration,
});

export interface Launch extends S.To<typeof Launch> {}
