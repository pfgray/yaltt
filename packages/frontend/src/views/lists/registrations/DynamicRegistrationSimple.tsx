import * as S from "@effect/schema/Schema";
import { formatError } from "@effect/schema/TreeFormatter";
import { AppId, createToolInstallation } from "@yaltt/model";
import { Effect, Either, pipe } from "effect";
import { fetchBodyFromEndpoint } from "endpoint-ts-fetch";
import { PlatformConfiguration } from "lti-model";
import { WithRequest } from "../../../lib/api/WithRequest";
import { getDecode } from "../../../lib/api/request";
import { provideRequestService } from "../../../lib/api/requestServiceImpl";
import { fetchApp } from "../../../lib/apps/apps";
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
  appId: AppId;
  openid_configuration: string;
  registration_token?: string;
}) =>
  pipe(
    fetchOpenIdConfig(params),
    Effect.bindTo("openidConfig"),
    Effect.bind("app", () => fetchApp({ appId: params.appId }))
  );

const installToolReq = fetchBodyFromEndpoint(createToolInstallation);

export const DynamicRegistrationSimple = () => {
  const parsedParamsQuery = useParsedParamsQuery(
    S.struct({
      appId: S.compose(S.NumberFromString, AppId),
    }),
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
            onRight: ({ params, query }) => (
              <WithRequest
                eff={fetchDynRegData({ ...query, appId: params.appId })}
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
                                    installToolReq(params)({
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
