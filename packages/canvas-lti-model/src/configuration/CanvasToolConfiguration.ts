import * as S from "@fp-ts/schema";
import { CanvasScopes } from "../scopes/CanvasScopes";
import { CanvasToolExtension } from "./CanvasToolExtension";

export const CanvasToolConfiguration = S.struct({
  title: S.string,
  description: S.string,
  target_link_uri: S.string,
  oidc_initiation_url: S.string,
  custom_fields: S.optional(S.record(S.string, S.string)),
  public_jwk_url: S.optional(S.string),
  icon_url: S.optional(S.string),
  scopes: S.array(S.literal(...Object.values(CanvasScopes))),
  extensions: S.optional(S.array(CanvasToolExtension)),
});

export interface CanvasToolConfiguration
  extends S.Infer<typeof CanvasToolConfiguration> {}
