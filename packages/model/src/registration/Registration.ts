import * as S from "@fp-ts/schema";
import { PlatformConfiguration, ToolConfiguration } from "lti-model";

export const Registration = S.struct({
  id: S.number,
  appId: S.number,
  toolConfiguration: ToolConfiguration,
  platformConfiguration: PlatformConfiguration,
});

export type Registration = S.Infer<typeof Registration>;
