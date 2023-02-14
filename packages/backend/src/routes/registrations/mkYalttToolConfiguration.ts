import { App, Registration, YalttClaim } from "@yaltt/model";
import { LtiMessage, ToolConfiguration } from "lti-model";
import * as Eff from "@effect/io/Effect";
import { getConfig, YalttConfig } from "../../config/ConfigService";

// export const pathForMessageType = () =>

export const mkYalttUrl =
  ({ ssl, primaryHostname }: YalttConfig) =>
  (rest: string) =>
    `http${ssl ? "s" : ""}://${primaryHostname}${rest}`;

export const mkYalttToolConfiguration =
  (config: YalttConfig) =>
  (
    app: App,
    registration: { id: number },
    claims: ReadonlyArray<YalttClaim>,
    customParameters: Record<string, string>,
    messages: ReadonlyArray<LtiMessage>
  ) => {
    const mkUrl = mkYalttUrl(config);
    const mkRegUrl = (rest: string) =>
      mkUrl(`/api/registrations/${registration.id}${rest}`);
    return {
      application_type: "web",
      client_name: app.name,
      client_uri: mkUrl(""),
      grant_types: ["client_credentials", "implicit"],
      jwks_uri: mkRegUrl(`/jwks`),
      initiate_login_uri: mkRegUrl(`/login`),
      redirect_uris: [mkRegUrl("/launch")],
      response_types: ["id_token"],
      scope: "",
      token_endpoint_auth_method: "private_key_jwt",
      "https://purl.imsglobal.org/spec/lti-tool-configuration": {
        claims,
        custom_parameters: customParameters,
        domain: config.primaryHostname,
        messages,
        target_link_uri: mkRegUrl("/launch"),
      },
    };
  };
