import * as S from "@effect/schema/Schema";
import { formatError } from "@effect/schema/TreeFormatter";
import { AppId, createToolInstallation } from "@yaltt/model";
import { Effect, Either, pipe } from "effect";
import { fetchBodyFromEndpoint } from "endpoint-ts-fetch";
import { PlatformConfiguration } from "lti-model";
import { WithRequest } from "../../../lib/api/WithRequest";
import { getDecode } from "../../../lib/api/request";
import { provideRequestService } from "../../../lib/api/requestServiceImpl";
import { fetchApp, fetchApps } from "../../../lib/apps/apps";
import { WithAuth } from "../../../lib/auth/WithAuth";
import { useParsedParamsQuery } from "../../../lib/react-router/useParsedParamsQuery";
import { Pre } from "../../../lib/ui/Pre";
import { sendCloseMessage } from "./sendCloseMessage";
import { useInstallingState } from "./useInstallingState";
import {
  InstallButton,
  InstallErrorDisplay,
  OpenIdConfigParseError,
} from "./shared";

const fetchOpenIdConfig = (params: {
  openid_configuration: string;
  registration_token?: string;
}) =>
  getDecode(S.unknown)(
    `/api/retrieve_openid_configuration?url=${encodeURIComponent(params.openid_configuration)}` +
      (params.registration_token
        ? `&registration_token=${encodeURIComponent(params.registration_token)}`
        : "")
  );

const fetchDynRegData = (params: {
  openid_configuration: string;
  registration_token?: string;
}) =>
  pipe(
    fetchApps(),
    Effect.flatMap((apps) => {
      if (apps.length === 0) {
        return Effect.fail({
          _tag: "NoAppsError" as const,
          message: "No apps found. Please create an app first.",
        });
      }
      return Effect.succeed(apps[0]);
    }),
    Effect.bindTo("app"),
    Effect.bind("openidConfig", () => fetchOpenIdConfig(params))
  );

const installToolReq = fetchBodyFromEndpoint(createToolInstallation);

export const DynamicRegistrationSimpleAuto = () => {
  const parsedParamsQuery = useParsedParamsQuery(
    S.struct({}),
    S.struct({
      openid_configuration: S.string,
      registration_token: S.optional(S.string),
    })
  );

  const { install, installTool } = useInstallingState((state) => state);

  return (
    <WithAuth>
      {(user) =>
        pipe(
          parsedParamsQuery,
          Either.match({
            onRight: ({ query }) => (
              <WithRequest
                eff={fetchDynRegData(query)}
                onError={(error) => {
                  if (
                    typeof error === "object" &&
                    error !== null &&
                    "_tag" in error &&
                    error._tag === "NoAppsError"
                  ) {
                    return (
                      <div className="flex flex-col items-center justify-center w-full h-full">
                        <article className="prose">
                          <h1 className="text-center text-5xl">No Apps Found</h1>
                          <p className="text-center">
                            You need to create an app before you can use dynamic
                            registration.
                          </p>
                          <div className="w-full flex justify-center">
                            <a href="/" className="btn btn-primary">
                              Go to Apps
                            </a>
                          </div>
                        </article>
                      </div>
                    );
                  }
                  return null;
                }}
              >
                {({ openidConfig, app }) =>
                  pipe(
                    S.decodeUnknownEither(PlatformConfiguration)(openidConfig, {
                      onExcessProperty: "ignore",
                    }),
                    Either.match({
                      onLeft: (errors) => (
                        <OpenIdConfigParseError
                          openidConfigurationUrl={query.openid_configuration}
                          rawResponse={openidConfig}
                          parseError={errors}
                        />
                      ),
                      onRight: (platformConfiguration) => (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                          <article className="prose">
                            <h1 className="text-center text-7xl">{app.name}</h1>

                            <div className="w-full flex justify-center flex-row">
                              <InstallButton
                                install={install}
                                className="btn btn-primary btn-lg"
                                onClick={() => {
                                  pipe(
                                    installToolReq({ appId: app.id })({
                                      customParameters: {},
                                      platformConfiguration:
                                        platformConfiguration,
                                      registrationToken:
                                        query.registration_token,
                                      registrationEndpoint:
                                        platformConfiguration.registration_endpoint,
                                      scopes: [
                                        "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem",
                                        "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem.readonly",
                                        "https://purl.imsglobal.org/spec/lti-ags/scope/result.readonly",
                                        "https://purl.imsglobal.org/spec/lti-ags/scope/score",
                                      ],
                                      messages: [
                                        {
                                          label: "Yaltt",
                                          type: "LtiDeepLinkingRequest",
                                          placements: ["RichTextEditor"],
                                        },
                                        {
                                          label: "Yaltt",
                                          type: "LtiResourceLinkRequest",
                                          placements: ["ContentArea"],
                                        },
                                      ],
                                    }),
                                    installTool,
                                    Effect.flatMap(() => sendCloseMessage),
                                    provideRequestService,
                                    Effect.runCallback
                                  );
                                }}
                              />
                            </div>
                            <InstallErrorDisplay install={install} />
                          </article>
                        </div>
                      ),
                    })
                  )
                }
              </WithRequest>
            ),
            onLeft: (err) => (
              <div>
                error
                <Pre>{formatError(err)}</Pre>{" "}
              </div>
            ),
          })
        )
      }
    </WithAuth>
  );
};
