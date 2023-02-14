import * as S from "@fp-ts/schema";
import { PlatformConfiguration } from "lti-model";
import { isoStringDate } from "../schemas/isoStringDate";

export const Registration = S.struct({
  id: S.number,
  app_id: S.number,
  created: isoStringDate,
  claims: S.array(S.string),
  custom_parameters: S.record(S.string, S.string),
  platform_configuration: PlatformConfiguration,
});

export type Registration = S.Infer<typeof Registration>;
