import { PlatformConfiguration } from "lti-model";

const CanvasHost = "http://canvas.docker";

export const CanvasPlatformConfiguration: PlatformConfiguration = {
  authorization_endpoint: `${CanvasHost}/api/lti/authorize_redirect`,
  "https://purl.imsglobal.org/spec/lti-platform-configuration": {
    messages_supported: [], // todo
    product_family_code: "canvas",
    version: "1.0.0",
    variables: [""], // todo: available substitution variables
  },
  claims_supported: [""], // todo
  scopes_supported: [""], // todo
  id_token_signing_alg_values_supported: ["RS256"],
  issuer: CanvasHost,
  jwks_uri: `${CanvasHost}/jwks`,
  registration_endpoint: `${CanvasHost}/api/lti/registrations`,
  response_types_supported: ["id_token"],
  token_endpoint: `${CanvasHost}/api/lti/registrations`,
  token_endpoint_auth_methods_supported: ["private_key_jwt"],
  authorization_server: CanvasHost,
};
