import * as S from "@effect/schema/Schema";
import { formatError } from "@effect/schema/TreeFormatter";
import { createNewAppInstallation } from "@yaltt/model";
import { Effect, Either, pipe } from "effect";
import * as O from "effect/Option";
import { fetchBodyFromEndpoint } from "endpoint-ts-fetch";
import { PlatformConfiguration } from "lti-model";
import * as React from "react";
import { provideRequestService } from "../../../lib/api/requestServiceImpl";
import { WithRequest } from "../../../lib/api/WithRequest";
import { YalttAPI } from "../../../lib/api/YalttAPI";
import { WithAuth } from "../../../lib/auth/WithAuth";
import { useParsedQuery } from "../../../lib/react-router/useParsedQuery";
import { Pre } from "../../../lib/ui/Pre";
import { sendCloseMessage } from "./sendCloseMessage";
import { useInstallingState } from "./useInstallingState";
import {
  InstallButton,
  InstallErrorDisplay,
  OpenIdConfigParseError,
  RawPlatformConfigDisplay,
} from "./shared";

const installToolReq = fetchBodyFromEndpoint(createNewAppInstallation);

export const DynamicRegistrationCustom = () => {
  const query = useParsedQuery(
    S.struct({
      openid_configuration: S.string,
      registration_token: S.optional(S.string),
    })
  );

  const [jsonConfiguration, setJsonConfiguration] = React.useState("");

  const { install, installTool } = useInstallingState((state) => state);

  return (
    <WithAuth>
      {(user) =>
        pipe(
          query,
          Either.match({
            onRight: (q) => (
              <WithRequest
                eff={YalttAPI.registrations.getOpenidConfig({
                  url: q.openid_configuration,
                  registration_token: O.fromNullable(q.registration_token),
                })}
              >
                {(openidConfig) =>
                  pipe(
                    S.decodeUnknownEither(PlatformConfiguration)(openidConfig, {
                      onExcessProperty: "ignore",
                    }),
                    Either.match({
                      onLeft: (errors) => (
                        <OpenIdConfigParseError
                          openidConfigurationUrl={q.openid_configuration}
                          rawResponse={openidConfig}
                          parseError={errors}
                        />
                      ),
                      onRight: (platformConfiguration) => (
                        <div className="flex flex-col items-center w-full">
                          <article className="prose mt-5">
                            <h1 className="text-center">
                              Installing app into "
                              {
                                (openidConfig as any)[
                                  "https://purl.imsglobal.org/spec/lti-platform-configuration"
                                ][
                                  "https://canvas.instructure.com/lti/account_name"
                                ]
                              }
                              "
                            </h1>

                            <div>
                              <div className="form-control">
                                <label htmlFor="custom-parameters">
                                  Raw JSON Configuration
                                </label>
                                <textarea
                                  id="json-configuration"
                                  className="textarea textarea-bordered mb-4"
                                  onChange={(ev) =>
                                    setJsonConfiguration(ev.currentTarget.value)
                                  }
                                  value={jsonConfiguration}
                                ></textarea>
                              </div>
                            </div>
                            <div className="w-full flex justify-end flex-row">
                              <InstallButton
                                install={install}
                                onClick={() => {
                                  pipe(
                                    installToolReq()({
                                      platformConfiguration,
                                      registrationToken: q.registration_token,
                                      registrationEndpoint:
                                        platformConfiguration.registration_endpoint,
                                      toolConfiguration:
                                        JSON.parse(jsonConfiguration),
                                    }),
                                    installTool,
                                    Effect.flatMap(() => sendCloseMessage),
                                    provideRequestService,
                                    (a) => a,
                                    Effect.runCallback
                                  );
                                }}
                              />
                            </div>

                            <InstallErrorDisplay install={install} />
                            <RawPlatformConfigDisplay
                              rawConfig={openidConfig}
                              fetchedFromUrl={q.openid_configuration}
                            />
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
