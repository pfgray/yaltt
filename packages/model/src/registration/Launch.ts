import * as S from "@effect/schema/Schema";
import { App } from "../app/App";
import type * as B from "effect/Brand";
import { Registration } from "./Registration";

export type LaunchId = number & B.Brand<"LaunchId">;

export const LaunchId = S.number.pipe(S.brand("LaunchId"));

export const Launch = S.struct({
  id: LaunchId,
  created: S.Date,
  id_token: S.unknown,
  registration_id: S.number,
  person_id: S.optional(S.number),
  context_id: S.optional(S.number),
  app: App,
  registration: Registration,
});

export interface Launch extends S.Schema.To<typeof Launch> {}
