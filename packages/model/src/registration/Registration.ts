import * as S from "@fp-ts/schema";
import { PlatformConfiguration, ToolConfiguration } from "lti-model";
import { isoStringDate } from "../schemas/isoStringDate";

export const Registration = S.struct({
  id: S.number,
  app_id: S.number,
  created: isoStringDate,
  tool_configuration: ToolConfiguration,
  platform_configuration: PlatformConfiguration,
});

export type Registration = S.Infer<typeof Registration>;
