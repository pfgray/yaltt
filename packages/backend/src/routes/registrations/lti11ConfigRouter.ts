import { Effect, pipe } from "effect";
import * as express from "express";
import * as S from "@effect/schema/Schema";
import { effRequestHandler } from "../../express/effRequestHandler";
import { stringToInteger } from "@yaltt/model";
import { parseParams } from "../../express/parseParams";
import { getRegistrationForId } from "../../model/entities/registrations";
import { getAppForId } from "../../model/entities/apps";
import { ExpressRequestService } from "../../express/RequestService";

export const lti11ConfigRouter = express.Router();

const configUrlParams = parseParams(
  S.struct({
    registrationId: stringToInteger,
  })
);

/**
 * Generates the LTI 1.1 XML cartridge configuration for Canvas
 * This configuration can be copied and pasted into Canvas's App Configuration
 */
const generateLti11Xml = (
  appName: string,
  launchUrl: string,
  description?: string
): string => {
  const escapedAppName = escapeXml(appName);
  const escapedDescription = escapeXml(description || `${appName} LTI Tool`);

  return `<?xml version="1.0" encoding="UTF-8"?>
<cartridge_basiclti_link xmlns="http://www.imsglobal.org/xsd/imslticc_v1p0"
    xmlns:blti = "http://www.imsglobal.org/xsd/imsbasiclti_v1p0"
    xmlns:lticm ="http://www.imsglobal.org/xsd/imslticm_v1p0"
    xmlns:lticp ="http://www.imsglobal.org/xsd/imslticp_v1p0"
    xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation = "http://www.imsglobal.org/xsd/imslticc_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticc_v1p0.xsd
    http://www.imsglobal.org/xsd/imsbasiclti_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imsbasiclti_v1p0.xsd
    http://www.imsglobal.org/xsd/imslticm_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticm_v1p0.xsd
    http://www.imsglobal.org/xsd/imslticp_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticp_v1p0.xsd">
    <blti:title>${escapedAppName}</blti:title>
    <blti:description>${escapedDescription}</blti:description>
    <blti:launch_url>${escapeXml(launchUrl)}</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
        <lticm:property name="privacy_level">public</lticm:property>
        <lticm:options name="course_navigation">
            <lticm:property name="enabled">true</lticm:property>
            <lticm:property name="text">${escapedAppName}</lticm:property>
        </lticm:options>
    </blti:extensions>
</cartridge_basiclti_link>`;
};

/**
 * Escapes XML special characters
 */
const escapeXml = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

/**
 * Constructs the full launch URL from the request
 */
const constructLaunchUrl = (
  req: express.Request,
  registrationId: number
): string => {
  const protocol = req.protocol;
  const host = req.get("host");
  return `${protocol}://${host}/api/registrations/${registrationId}/lti11/launch`;
};

/**
 * Handler for GET /api/registrations/:registrationId/lti11/configuration.xml
 * Returns the LTI 1.1 XML cartridge configuration
 */
const handleConfigurationXml = effRequestHandler(
  pipe(
    configUrlParams,
    Effect.bindTo("params"),
    Effect.bind("registration", ({ params }) =>
      getRegistrationForId(params.registrationId)
    ),
    Effect.bind("app", ({ registration }) => getAppForId(registration.app_id)),
    Effect.bind("requestService", () => ExpressRequestService),
    Effect.flatMap(({ params, app, registration, requestService }) =>
      Effect.sync(() => {
        // Get the request object to construct the launch URL
        const launchUrl = constructLaunchUrl(
          requestService.request,
          params.registrationId
        );

        // Generate XML
        const xml = generateLti11Xml(app.name, launchUrl);

        return {
          status: 200,
          body: xml,
          raw: true,
          headers: {
            "Content-Type": "application/xml",
          },
        };
      })
    )
  )
);

lti11ConfigRouter.get(
  "/registrations/:registrationId/lti11/configuration.xml",
  handleConfigurationXml
);
