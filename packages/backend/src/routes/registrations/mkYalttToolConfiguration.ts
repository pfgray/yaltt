import { App, Registration, YalttClaim } from "@yaltt/model";
import { LtiMessage, ToolConfiguration } from "lti-model";
import { pipe, Effect, Option, Either } from "effect";
import { getConfig, YalttConfig } from "../../config/ConfigService";
import { ExpressRequest } from "../../express/RequestService";

// export const pathForMessageType = () =>

/**
 *
 * @param param0
 * @param contextRequest The contextual request to use for the hostname
 * @returns
 */
export const mkYalttUrl =
  ({ ssl, primaryHostname }: YalttConfig, contextRequest?: ExpressRequest) =>
  (rest: string) => {
    const host =
      typeof contextRequest !== "undefined"
        ? contextRequest.get("host")
        : primaryHostname;
    return `http${ssl ? "s" : ""}://${host}${rest}`;
  };

export const mkYalttToolConfiguration =
  (config: YalttConfig, contextualRequest?: ExpressRequest) =>
  (options: {
    app: App;
    registration: { id: number };
    claims: ReadonlyArray<string>;
    customParameters: Record<string, string>;
    messages: ReadonlyArray<LtiMessage>;
    scopes: ReadonlyArray<string>;
    toolId: string;
  }): ToolConfiguration => {
    const mkUrl = mkYalttUrl(config, contextualRequest);
    const mkRegUrl = (rest: string) =>
      mkUrl(`/api/registrations/${options.registration.id}${rest}`);
    const mkAppUrl = (rest: string) =>
      mkUrl(`/api/apps/${options.app.id}${rest}`);
    return {
      application_type: "web",
      client_name: options.app.name,
      client_uri: mkUrl(""),
      grant_types: ["client_credentials", "implicit"],
      jwks_uri: mkRegUrl(`/jwks`),
      initiate_login_uri: mkRegUrl(`/login`),
      redirect_uris: [mkRegUrl("/launch")],
      response_types: ["id_token"],
      scope: options.scopes.join(" "),
      token_endpoint_auth_method: "private_key_jwt",
      logo_uri: mkAppUrl("/icon.svg"),
      "https://purl.imsglobal.org/spec/lti-tool-configuration": {
        claims: options.claims,
        custom_parameters: options.customParameters,
        domain: config.primaryHostname,
        messages: options.messages,
        target_link_uri: mkRegUrl("/launch"),
        "https://canvas.instructure.com/lti/privacy_level": "public",
        "https://canvas.instructure.com/lti/tool_id": options.toolId,
      },
    };
  };
