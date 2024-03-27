import { App, YalttClaim } from "@yaltt/model";
import { CanvasPlacement, CanvasToolConfiguration } from "canvas-lti-model";
import { YalttConfig } from "../../config/ConfigService";
import { ExpressRequest } from "../../express/RequestService";
import { mkYalttUrl } from "./mkYalttToolConfiguration";

// export const pathForMessageType = () =>

export const mkYalttCanvasToolConfiguration =
  (config: YalttConfig, contextualRequest?: ExpressRequest) =>
  (
    app: App,
    registration: { id: number },
    claims: ReadonlyArray<YalttClaim>,
    customParameters: Record<string, string>,
    placements: ReadonlyArray<CanvasPlacement>
  ): CanvasToolConfiguration => {
    const mkUrl = mkYalttUrl(config, contextualRequest);
    const mkRegUrl = (rest: string) =>
      mkUrl(`/api/registrations/${registration.id}${rest}`);
    return {
      description: "Yet another LTI test tool",
      oidc_initiation_url: mkRegUrl("/login"),
      public_jwk_url: mkRegUrl("/jwks"),
      scopes: [],
      target_link_uri: mkRegUrl("/launch"),
      title: `${app.name}`,
      extensions: [
        {
          platform: "canvas.instructure.com",
          settings: {
            placements,
          },
        },
      ],
    };
  };
