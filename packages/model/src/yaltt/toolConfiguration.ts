import { ToolConfiguration } from "lti-model";

const YalttHost = "http://yaltt.paulgray.net";

export const YalttToolConfiguration = (
  registrationUuid: string
): ToolConfiguration => ({
  "https://purl.imsglobal.org/spec/lti-tool-configuration": {
    claims: ["iss", "sub", "name", "given_name", "family_name"],
    custom_parameters: {},
    description: "Yet Another LTI Test Tool.",
    domain: "yaltt.paulgray.net",
    messages: [
      {
        type: "LtiResourceLinkRequest",
        target_link_uri: `${YalttHost}/api/registrations/${registrationUuid}/launch`,
        label: "Yaltt LtiResourceLinkRequest",
        custom_parameters: {},
      },
    ],
    // todo, not sure what this is even used for.
    target_link_uri: `${YalttHost}/api/registrations/${registrationUuid}/launch`,
  },
  application_type: "web",
  client_name: "Yaltt",
  client_uri: YalttHost,
  grant_types: ["client_credentials", "implicit"],
  initiate_login_uri: `${YalttHost}/api/registrations/${registrationUuid}/login`,
  jwks_uri: `${YalttHost}/api/jwks`,
  redirect_uris: [`${YalttHost}/callback`],
  response_types: ["id_token"],
  scope: "", // todo: what should we request here?
  token_endpoint_auth_method: "private_key_jwt",
  policy_uri: `${YalttHost}/policy`,
  tos_uri: `${YalttHost}/tos`,
  contacts: [],
});
