import * as S from "@effect/schema/Schema";
import { formatError } from "@effect/schema/TreeFormatter";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import {
  AppId,
  AppWithRegistrations,
  EncodeError,
  TagADT,
  createToolInstallation,
  match,
} from "@yaltt/model";
import { Effect, Either, pipe, ReadonlyRecord } from "effect";
import { LtiMessage, LtiPlacements, PlatformConfiguration } from "lti-model";
import * as React from "react";
import { create } from "zustand";
import { WithRequest } from "../../../lib/api/WithRequest";
import { getDecode } from "../../../lib/api/request";
import { provideRequestService } from "../../../lib/api/requestServiceImpl";
import { fetchApp } from "../../../lib/apps/apps";
import { WithAuth } from "../../../lib/auth/WithAuth";
import {
  FetchException,
  FetchParseError,
  FetchParseJsonError,
  fetchBodyFromEndpoint,
} from "../../../lib/endpoint-ts/fetchFromEndpoint";
import { useParsedParamsQuery } from "../../../lib/react-router/useParsedParamsQuery";
import { CanvasPlacementTypes } from "canvas-lti-model";
import { sendCloseMessage } from "./sendCloseMessage";

type Request<E, A> = TagADT<{
  initial: {};
  loading: {};
  loaded: { data: A };
  failed: { error: E };
}>;

type InstallingStateError =
  | FetchException
  | FetchParseError
  | FetchParseJsonError
  | EncodeError;

type InstallingState = {
  install: Request<InstallingStateError, unknown>;
  installTool: <R, A>(
    eff: Effect.Effect<A, InstallingStateError, R>
  ) => Effect.Effect<A, InstallingStateError, R>;
  setInstalling: () => Effect.Effect<void, never, never>;
  setInstallFailed: (
    err: InstallingStateError
  ) => Effect.Effect<void, never, never>;
  setInstallSucceeded: () => Effect.Effect<void, never, never>;
};

const useInstallingState = create<InstallingState>()((set) => ({
  install: { _tag: "initial" },
  installTool: (eff) =>
    pipe(
      Effect.sync(() => set((state) => ({ install: { _tag: "loading" } }))),
      Effect.flatMap(() => eff),
      Effect.tap(() =>
        Effect.sync(() =>
          set((state) => ({ install: { _tag: "loaded", data: {} } }))
        )
      ),
      Effect.tapError((err) =>
        Effect.sync(() =>
          set((state) => ({
            install: { _tag: "failed", error: err },
          }))
        )
      )
    ),
  setInstalling: () =>
    Effect.sync(() => set((state) => ({ install: { _tag: "loading" } }))),
  setInstallFailed: (err: InstallingStateError) =>
    Effect.sync(() =>
      set((state) => ({
        install: { _tag: "failed", error: err },
      }))
    ),
  setInstallSucceeded: () =>
    Effect.sync(() =>
      set((state) => ({ install: { _tag: "loaded", data: {} } }))
    ),
}));

const fetchOpenIdConfig = (params: {
  openid_configuration: string;
  registration_token?: string;
}) =>
  getDecode(S.unknown)(
    `/api/retrieve_openid_configuration?url=${params.openid_configuration}` +
      (params.registration_token
        ? `&registration_token=${params.registration_token}`
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
                    S.decodeEither(PlatformConfiguration)(openidConfig, {
                      onExcessProperty: "ignore",
                    }),
                    Either.match({
                      onLeft: (errors) => (
                        <div className="flex flex-col items-center w-full">
                          <article className="prose">
                            <h3>Error retrieving OpenID Configuration from:</h3>
                            <Pre>{query.openid_configuration}</Pre>
                            <h3>Raw Response Body</h3>
                            <Pre>{JSON.stringify(openidConfig, null, 2)}</Pre>
                            <h3>Parse Error:</h3>
                            <Pre>{formatError(errors)}</Pre>
                          </article>
                        </div>
                      ),
                      onRight: (platformConfiguration) => (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                          <article className="prose">
                            <h1 className="text-center text-7xl">{app.name}</h1>

                            <div className="w-full flex justify-center flex-row">
                              <button
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
                                            <Pre>
                                              {JSON.stringify(
                                                fe.reason,
                                                null,
                                                2
                                              )}
                                            </Pre>
                                          </>
                                        ),
                                        fetch_parse_json_error: (pe) => (
                                          <>
                                            <div>Unable to parse json:</div>
                                            <Pre>{pe.original}</Pre>
                                            <div>Error:</div>
                                            <Pre>
                                              {JSON.stringify(pe.error)}
                                            </Pre>
                                          </>
                                        ),
                                        fetch_parse_error: (pe) => (
                                          <>
                                            <div>Error parsing response:</div>
                                            <Pre>{formatError(pe.reason)}</Pre>
                                            <div>Original data response:</div>
                                            <Pre>
                                              {JSON.stringify(
                                                pe.original,
                                                null,
                                                2
                                              )}
                                            </Pre>
                                          </>
                                        ),
                                        encode_error: (ee) => (
                                          <>
                                            <div>Error Encoding data:</div>
                                            <Pre>{formatError(ee.error)}</Pre>
                                            <div>Original encode:</div>
                                            <Pre>
                                              {JSON.stringify(
                                                ee.actual,
                                                null,
                                                2
                                              )}
                                            </Pre>
                                          </>
                                        ),
                                      })
                                    )}
                                  </div>
                                ),
                              })
                            )}
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
