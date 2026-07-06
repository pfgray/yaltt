import * as S from "@effect/schema/Schema";
import { formatError } from "@effect/schema/TreeFormatter";
import * as O from "effect/Option";
import {
  AppId,
  TagADT,
  createToolInstallation,
  match,
} from "@yaltt/model";
import { Effect, Either, pipe } from "effect";
import {
  CreatedToolConfiguration,
  LtiMessage,
  PlatformConfiguration,
} from "lti-model";
import * as React from "react";
import { create } from "zustand";
import { WithRequest } from "../../../lib/api/WithRequest";
import { provideRequestService } from "../../../lib/api/requestServiceImpl";
import { fetchApp } from "../../../lib/apps/apps";
import { WithAuth } from "../../../lib/auth/WithAuth";
import { fetchBodyFromEndpoint } from "endpoint-ts-fetch";
import { useParsedParamsQuery } from "../../../lib/react-router/useParsedParamsQuery";
import { useInstallingState } from "./useInstallingState";
import { sendCloseMessage } from "./sendCloseMessage";
import { Pre } from "../../../lib/ui/Pre";
import { parseCustomParams } from "./DynamicRegistrationForm";
import { usePlacementsStore } from "./usePlacementsStore";
import { MessageTypes } from "./shared/MessageTypes";
import { YalttAPI } from "../../../lib/api/YalttAPI";
import {
  InstallButton,
  InstallErrorDisplay,
  OpenIdConfigParseError,
  RawPlatformConfigDisplay,
} from "./shared";

type SelectedScopeState = {
  scopes: ReadonlyArray<string>;
  toggleScope: (scope: string) => void;
  setScopes: (scopes: ReadonlyArray<string>) => void;
};

export const useScopeStore = create<SelectedScopeState>()((set) => ({
  scopes: [],
  setScopes: (scopes) => set({ scopes }),
  toggleScope: (scope) =>
    set((state) =>
      state.scopes.includes(scope)
        ? { scopes: state.scopes.filter((s) => s !== scope) }
        : { scopes: [...state.scopes, scope] }
    ),
}));

export const useExtraScopesStore = create<{
  extraScopes: string;
  setExtraScopes: (extraScopes: string) => void;
}>()((set) => ({
  extraScopes: "",
  setExtraScopes: (extraScopes) => set({ extraScopes }),
}));

export type Request<E, A> = TagADT<{
  initial: {};
  loading: {};
  loaded: { data: A };
  failed: { error: E };
}>;

const fetchDynRegData = (params: {
  appId: AppId;
  openid_configuration: string;
  registration_token?: string;
}) => {
  console.log("Fetching OpenID Config with params:", params);
  return pipe(
    YalttAPI.registrations.getOpenidConfig({
      url: params.openid_configuration,
      registration_token: O.fromNullable(params.registration_token),
    }),
    Effect.bindTo("openidConfig"),
    Effect.bind("app", () => fetchApp({ appId: params.appId }))
  );
};

const installToolReq = fetchBodyFromEndpoint(createToolInstallation);

export const DynamicRegistration = () => {
  const parsedParamsQuery = useParsedParamsQuery(
    S.struct({
      appId: S.compose(S.NumberFromString, AppId),
    }),
    S.struct({
      openid_configuration: S.string,
      registration_token: S.optional(S.string),
    })
  );

  const [topCustomParams, setTopCustomParams] = React.useState("");
  const [toolId, setToolId] = React.useState(
    "toolid-" + Math.floor(Math.random() * 1000)
  );
  const [includeToolId, setIncludeToolId] = React.useState(false);
  const [disableReinstall, setDisableReinstall] = React.useState(false);
  const scopes = useScopeStore((state) => state.scopes);
  const extraScopes = useExtraScopesStore((state) =>
    state.extraScopes
      .split("\n")
      .map((a) => a.trim())
      .filter((s) => s !== "")
  );
  const placements = usePlacementsStore((state) => state.placements);

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
                        <div className="flex flex-col items-center w-full">
                          <article className="prose mt-5">
                            <h1 className="text-center">
                              Installing {app.name} into "
                              {
                                (openidConfig as any)[
                                  "https://purl.imsglobal.org/spec/lti-platform-configuration"
                                ][
                                  "https://canvas.instructure.com/lti/account_name"
                                ]
                              }
                              "
                            </h1>

                            <MessageTypes
                              platformConfiguration={platformConfiguration}
                              app={app}
                            />
                            <div className="divider"></div>
                            <ServicesSupported
                              platformConfiguration={platformConfiguration}
                            />
                            <div className="divider"></div>
                            <div>
                              <h3>Other Configuration Options</h3>
                              <div className="form-control">
                                <label htmlFor="custom-parameters">
                                  Custom Parameters
                                </label>
                                <textarea
                                  id="custom-parameters"
                                  className="textarea textarea-bordered"
                                  placeholder="Custom Parameters (key=value format)"
                                  onChange={(ev) =>
                                    setTopCustomParams(ev.currentTarget.value)
                                  }
                                  value={topCustomParams}
                                ></textarea>
                                {isCanvas(platformConfiguration) && (
                                  <>
                                    <label className="label cursor-pointer justify-normal mt-3">
                                      <input
                                        type="checkbox"
                                        className="checkbox"
                                        onChange={() => {
                                          setIncludeToolId(!includeToolId);
                                        }}
                                        checked={includeToolId}
                                      />
                                      <span className="label-text ml-2">
                                        Include Tool ID
                                      </span>
                                    </label>

                                    <label htmlFor="tool-id" className="mt-1">
                                      https://canvas.instructure.com/lti/tool_id
                                    </label>
                                    <input
                                      id="tool-id"
                                      type="text"
                                      className="input input-bordered mb-3"
                                      disabled={!includeToolId}
                                      onChange={(ev) =>
                                        setToolId(
                                          ev.currentTarget.value?.trim()
                                        )
                                      }
                                      value={toolId}
                                    />

                                    <label className="label cursor-pointer justify-normal mt-3">
                                      <input
                                        type="checkbox"
                                        className="checkbox"
                                        onChange={() => {
                                          setDisableReinstall(
                                            !disableReinstall
                                          );
                                        }}
                                        checked={disableReinstall}
                                      />
                                      <span className="label-text ml-2">
                                        Disable Reinstallation (Prevents users
                                        from reinstalling this tool
                                        configuration in Canvas)
                                      </span>
                                    </label>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="w-full flex justify-end flex-row">
                              <InstallButton
                                install={install}
                                onClick={() => {
                                  pipe(
                                    installToolReq(params)({
                                      customParameters:
                                        parseCustomParams(topCustomParams),
                                      platformConfiguration:
                                        platformConfiguration,
                                      registrationToken:
                                        query.registration_token,
                                      registrationEndpoint:
                                        platformConfiguration.registration_endpoint,
                                      scopes: [...scopes, ...extraScopes],
                                      toolId: includeToolId
                                        ? toolId
                                        : undefined,
                                      disableReinstall: disableReinstall,
                                      messages: Object.entries(placements)
                                        .filter(([, p]) => p.enabled)
                                        .map(
                                          ([key, p]): LtiMessage => ({
                                            type: p.message_type,
                                            custom_parameters:
                                              parseCustomParams(
                                                p.custom_parameters
                                              ),
                                            label: p.label,
                                            icon_uri: p.icon_uri,
                                            roles: p.roles
                                              .split(",")
                                              .map((s) => s.trim())
                                              .filter((s) => s !== ""),
                                            placements: [key],
                                          })
                                        ),
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
                            <RawPlatformConfigDisplay
                              rawConfig={openidConfig}
                              fetchedFromUrl={query.openid_configuration}
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

export const ServicesSupported = (props: {
  platformConfiguration: PlatformConfiguration;
  editingToolConfiguration?: CreatedToolConfiguration;
}) => {
  const { editingToolConfiguration } = props;
  const { scopes, toggleScope, setScopes } = useScopeStore((state) => state);

  const { extraScopes, setExtraScopes } = useExtraScopesStore((state) => state);

  React.useEffect(() => {
    setScopes(
      editingToolConfiguration
        ? editingToolConfiguration.scope.split(" ")
        : props.platformConfiguration.scopes_supported
    );

    setExtraScopes(
      editingToolConfiguration
        ? editingToolConfiguration.scope
            .split(" ")
            .filter(
              (s) => !props.platformConfiguration.scopes_supported.includes(s)
            )
            .join("\n")
        : ""
    );
  }, []);

  return (
    <div>
      <h3>Scopes</h3>
      <div className="list-none pl-0 grid grid-cols-2 gap-2">
        {props.platformConfiguration.scopes_supported
          .map((type) => ({
            type,
            description: PossibleScopes.find((ps) => ps.type === type)
              ?.description,
          }))
          .map(({ type, description }) => (
            <div className="form-control" key={type}>
              <label className="label cursor-pointer justify-normal">
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={() => toggleScope(type)}
                  checked={scopes.includes(type)}
                />
                <span className="label-text ml-2">{description || type}</span>
              </label>
            </div>
          ))}
      </div>
      <div>
        <h6 className="mt-3">Custom Scopes</h6>
        <div className="form-control">
          <textarea
            className="textarea textarea-bordered"
            placeholder="Custom Scopes (one per line)"
            onChange={(ev) => setExtraScopes(ev.currentTarget.value)}
            value={extraScopes}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

const PossibleScopes = [
  {
    type: "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem",
    description: "Manage Gradebook Columns",
  },
  {
    type: "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem.readonly",
    description: "Read Gradebook Columns",
  },
  {
    type: "https://purl.imsglobal.org/spec/lti-ags/scope/result.readonly",
    description: "Read Student Submissions",
  },
  {
    type: "https://purl.imsglobal.org/spec/lti-ags/scope/score",
    description: "Create Student Submissions",
  },
  {
    type: "https://purl.imsglobal.org/spec/lti/scope/noticehandlers",
    description: "Register Notice Handlers",
  },
  {
    type: "https://purl.imsglobal.org/spec/lti/scope/report",
    description: "Asset Reports",
  },
  {
    type: "https://purl.imsglobal.org/spec/lti/scope/eula/user",
    description: "Report User EULA Acceptance",
  },
  {
    type: "https://purl.imsglobal.org/spec/lti/scope/eula/deployment",
    description: "Register EULA for Deployment",
  },
  {
    type: "https://purl.imsglobal.org/spec/lti/scope/asset.readonly",
    description: "Read Asset files",
  },
  {
    type: "https://purl.imsglobal.org/spec/lti-nrps/scope/contextmembership.readonly",
    description: "Read Course Membership",
  },
  {
    type: "https://canvas.instructure.com/lti/public_jwk/scope/update",
    description: "Update Public JWK",
  },
  {
    type: "https://canvas.instructure.com/lti/account_lookup/scope/show",
    description: "Lookup Accounts",
  },
  {
    type: "https://canvas.instructure.com/lti-ags/progress/scope/show",
    description: "Read Student Progress",
  },
  {
    type: "https://canvas.instructure.com/lti/page_content/show",
    description: "Read Page Content",
  },
  {
    description: "Read Registrations",
    type: "https://purl.imsglobal.org/spec/lti-reg/scope/registration.readonly",
  },
  {
    description: "Manage Registrations",
    type: "https://purl.imsglobal.org/spec/lti-reg/scope/registration",
  },
  {
    description: "Use the user endpoint",
    type: "url:GET|/api/v1/accounts/:account_id/users",
  },
];

export const isCanvas = (config: PlatformConfiguration) =>
  config["https://purl.imsglobal.org/spec/lti-platform-configuration"]
    .product_family_code === "canvas";

// type: S.string,
// target_link_uri: S.optional(Url),
// custom_parameters: S.optional(CustomParameters),
// icon_uri: S.optional(S.string),
// placements: S.optional(S.array(S.string)),
// roles: S.optional(S.array(S.string)),
