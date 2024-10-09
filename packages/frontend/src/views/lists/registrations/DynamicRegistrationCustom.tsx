import * as React from "react";
import { useParsedQuery } from "../../../lib/react-router/useParsedQuery";
import * as S from "@effect/schema/Schema";
import { WithAuth } from "../../../lib/auth/WithAuth";
import { WithRequest } from "../../../lib/api/WithRequest";
import { Effect, Either, pipe } from "effect";
import { formatError } from "@effect/schema/TreeFormatter";
import { newAppForm } from "../apps/Apps";
import { getGradientForString } from "../../../lib/ui/gradients";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { NewEntityForm } from "../NewEntityForm";
import { fetchApps } from "../../../lib/apps/apps";
import { fetchOpenIdConfig } from "./DynamicRegistration";
import { PlatformConfiguration } from "lti-model";
import { useInstallingState } from "./useInstallingState";
import { fetchBodyFromEndpoint } from "../../../lib/endpoint-ts/fetchFromEndpoint";
import {
  createNewAppInstallation,
  createToolInstallation,
  match,
} from "@yaltt/model";
import { sendCloseMessage } from "./sendCloseMessage";
import { provideRequestService } from "../../../lib/api/requestServiceImpl";

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
              <WithRequest eff={fetchOpenIdConfig(q)}>
                {(openidConfig) =>
                  pipe(
                    S.decodeEither(PlatformConfiguration)(openidConfig, {
                      onExcessProperty: "ignore",
                    }),
                    Either.match({
                      onLeft: (errors) => (
                        <div className="flex flex-col items-center w-full">
                          <article className="prose">
                            <h3>Error retrieving OpenID Configuration from:</h3>
                            <pre>{q.openid_configuration}</pre>
                            <h3>Raw Response Body</h3>
                            <pre>{JSON.stringify(openidConfig, null, 2)}</pre>
                            <h3>Parse Error:</h3>
                            <pre>{formatError(errors)}</pre>
                          </article>
                        </div>
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
                              <button
                                className="btn btn-primary"
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
                                    Effect.runCallback
                                  );
                                }}
                                disabled={pipe(
                                  install,
                                  match({
                                    initial: () => false,
                                    loading: () => true,
                                    loaded: () => true,
                                    failed: () => false,
                                  })
                                )}
                              >
                                {pipe(
                                  install,
                                  match({
                                    initial: () => "Install",
                                    loading: () => "Installing...",
                                    loaded: () => "Installed",
                                    failed: (err) => "Failed (Try Again)",
                                  })
                                )}
                              </button>
                            </div>

                            {pipe(
                              install,
                              match({
                                initial: () => <></>,
                                loading: () => <></>,
                                loaded: () => <></>,
                                failed: ({ error }) => (
                                  <div className="w-full flex justify-end flex-col">
                                    {pipe(
                                      error,
                                      match({
                                        fetch_exception: (fe) => (
                                          <>
                                            <div>Error fetching {fe.url}</div>
                                            <pre>
                                              {JSON.stringify(
                                                JSON.parse(
                                                  (fe.reason as any).e.body
                                                ),
                                                null,
                                                2
                                              )}
                                            </pre>
                                          </>
                                        ),
                                        fetch_parse_json_error: (pe) => (
                                          <>
                                            <div>Unable to parse json:</div>
                                            <pre>{pe.original}</pre>
                                            <div>Error:</div>
                                            <pre>
                                              {JSON.stringify(pe.error)}
                                            </pre>
                                          </>
                                        ),
                                        fetch_parse_error: (pe) => (
                                          <>
                                            <div>Error parsing response:</div>
                                            <pre>{formatError(pe.reason)}</pre>
                                            <div>Original data response:</div>
                                            <pre>
                                              {JSON.stringify(
                                                pe.original,
                                                null,
                                                2
                                              )}
                                            </pre>
                                          </>
                                        ),
                                        encode_error: (ee) => (
                                          <>
                                            <div>Error Encoding data:</div>
                                            <pre>{formatError(ee.error)}</pre>
                                            <div>Original encode:</div>
                                            <pre>
                                              {JSON.stringify(
                                                ee.actual,
                                                null,
                                                2
                                              )}
                                            </pre>
                                          </>
                                        ),
                                      })
                                    )}
                                  </div>
                                ),
                              })
                            )}
                            <div className="divider"></div>

                            <h3>Raw Platform Configuration</h3>

                            <pre>{JSON.stringify(openidConfig, null, 2)}</pre>
                            <h6>Fetched from:</h6>
                            <pre>{q.openid_configuration}</pre>
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
                <pre>{formatError(err)}</pre>{" "}
              </div>
            ),
          })
        )
      }
    </WithAuth>
  );
};
