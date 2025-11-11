import * as S from "@effect/schema/Schema";
import { formatError } from "@effect/schema/TreeFormatter";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import {
  AppId,
  AppWithRegistrations,
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
import { fetchBodyFromEndpoint } from "../../../lib/endpoint-ts/fetchFromEndpoint";
import { useParsedParamsQuery } from "../../../lib/react-router/useParsedParamsQuery";
import { CanvasPlacementTypes } from "canvas-lti-model";
import { useInstallingState } from "./useInstallingState";
import { sendCloseMessage } from "./sendCloseMessage";
import { Pre } from "../../../lib/ui/Pre";

type SelectedScopeState = {
  scopes: ReadonlyArray<string>;
  toggleScope: (scope: string) => void;
  setScopes: (scopes: ReadonlyArray<string>) => void;
};

const useScopeStore = create<SelectedScopeState>()((set) => ({
  scopes: [],
  setScopes: (scopes) => set({ scopes }),
  toggleScope: (scope) =>
    set((state) =>
      state.scopes.includes(scope)
        ? { scopes: state.scopes.filter((s) => s !== scope) }
        : { scopes: [...state.scopes, scope] }
    ),
}));

const useExtraScopesStore = create<{
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

export const fetchOpenIdConfig = (params: {
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
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="w-full flex justify-end flex-row">
                              <button
                                className="btn btn-primary"
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
                                            // target_link_uri: `${window.location.origin}/api/apps/${params.appId}/launch?placement=${key}`,
                                          })
                                        ),
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
                            <div className="divider"></div>

                            <h3>Raw Platform Configuration</h3>

                            <Pre>{JSON.stringify(openidConfig, null, 2)}</Pre>
                            <h6>Fetched from:</h6>
                            <Pre>{query.openid_configuration}</Pre>
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

const ServicesSupported = (props: {
  platformConfiguration: PlatformConfiguration;
}) => {
  const { scopes, toggleScope, setScopes } = useScopeStore((state) => state);

  const { extraScopes, setExtraScopes } = useExtraScopesStore((state) => state);

  React.useEffect(() => {
    setScopes(props.platformConfiguration.scopes_supported);
  }, []);

  return (
    <div>
      <h3>Permissions Supported by this Platform</h3>
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
];

type Placements = Record<
  string,
  {
    enabled: boolean;
    message_type: string;
    custom_parameters: string;
    icon_uri: string;
    roles: string;
    label: string;
  }
>;

export const isCanvas = (config: PlatformConfiguration) =>
  config["https://purl.imsglobal.org/spec/lti-platform-configuration"]
    .product_family_code === "canvas";

type InputType = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

type PlacementsStore = {
  placements: Placements;
  togglePlacement: (placement: string) => void;
  setPlacements: (placments: Placements) => void;
  updateLabel: (
    placement: string
  ) => (event: React.ChangeEvent<InputType>) => void;
  updateMessageType: (
    placement: string
  ) => (message_type: React.ChangeEvent<InputType>) => void;
  updateCustomParameters: (
    placement: string
  ) => (custom_parameters: React.ChangeEvent<InputType>) => void;
  updateIconUri: (
    placement: string
  ) => (icon_uri: React.ChangeEvent<InputType>) => void;
  updateRoles: (
    placement: string
  ) => (roles: React.ChangeEvent<InputType>) => void;
};

const updatePlacement =
  (
    key: string,
    set: (f: (p: PlacementsStore) => Partial<PlacementsStore>) => void
  ) =>
  (placementType: string) =>
  (event: React.ChangeEvent<InputType>) =>
    set((state) => ({
      placements: {
        ...state.placements,
        [placementType]: {
          ...state.placements[placementType],
          [key]: event.currentTarget.value,
        },
      },
    }));

const usePlacementsStore = create<PlacementsStore>()((set) => ({
  placements: {},
  togglePlacement: (placement: string) =>
    set((state) => {
      return {
        placements: {
          ...state.placements,
          [placement]: {
            ...state.placements[placement],
            enabled: !state.placements[placement].enabled,
          },
        },
      };
    }),
  setPlacements: (placements: Placements) => set((state) => ({ placements })),
  updateMessageType: updatePlacement("message_type", set),
  updateLabel: updatePlacement("label", set),
  updateCustomParameters: updatePlacement("custom_parameters", set),
  updateIconUri: updatePlacement("icon_uri", set),
  updateRoles: updatePlacement("roles", set),
}));

type ExpandedPlacementsState = {
  expanded: boolean;
  toggleExpanded: () => void;
};

const useExpandedPlacementsStore = create<ExpandedPlacementsState>()((set) => ({
  expanded: false,
  toggleExpanded: () => set((state) => ({ expanded: !state.expanded })),
}));

const MessageTypes = (props: {
  platformConfiguration: PlatformConfiguration;
  app: AppWithRegistrations;
}) => {
  const ltiPlatformConfig =
    props.platformConfiguration[
      "https://purl.imsglobal.org/spec/lti-platform-configuration"
    ];

  const { expanded, toggleExpanded } = useExpandedPlacementsStore(
    (state) => state
  );

  const advertisedPlacements = ltiPlatformConfig.messages_supported
    .flatMap((m) => m.placements || [])
    .filter((p) => p !== "resource_selection")
    .filter((item, i, ar) => ar.indexOf(item) === i)
    .map((p) => ({
      type: p,
      message_types: ltiPlatformConfig.messages_supported
        .filter((m) => (m.placements || []).includes(p))
        .map((m) => m.type),
      description:
        KnownPlacements.find((kp) => kp.type === p)?.description || p,
    }))
    .sort((a, b) => {
      const aIndex = KnownPlacements.findIndex((kp) => kp.type === a.type);
      const bIndex = KnownPlacements.findIndex((kp) => kp.type === b.type);
      return aIndex - bIndex;
    });

  const {
    placements,
    togglePlacement,
    setPlacements,
    updateCustomParameters,
    updateIconUri,
    updateLabel,
    updateMessageType,
    updateRoles,
  } = usePlacementsStore((state) => state);

  const unAdvertisedPlacements = pipe(
    LtiPlacements,
    ReadonlyRecord.filter(
      (p) => !advertisedPlacements.find((ap) => ap.type === p)
    ),
    ReadonlyRecord.map((a, b) => {
      if (a === "ContentArea") {
        return {
          type: "ContentArea",
          message_types: ["LtiResourceLinkRequest"],
          description: "Content Area",
        };
      } else if (a === "RichTextEditor") {
        return {
          type: "RichTextEditor",
          message_types: ["LtiDeepLinkingRequest"],
          description: "Rich Text Editor",
        };
      } else {
        const hmm: never = a;
        return hmm;
      }
    }),
    ReadonlyRecord.values
  );

  React.useEffect(() => {
    setPlacements({
      ...advertisedPlacements.reduce((acc: Placements, placement) => {
        return {
          ...acc,
          [placement.type]: {
            enabled: false,
            message_type:
              // Prefer LtiDeepLinkingRequest if it's available
              placement.message_types.includes("LtiDeepLinkingRequest")
                ? "LtiDeepLinkingRequest"
                : placement.message_types[0],
            custom_parameters: "foo=bar\ncontext_id=$Context.id",
            icon_uri: `${window.location.origin}/api/apps/${props.app.id}/icon.svg`,
            roles: "",
            label: `${props.app.name} (${placement.description})`,
          },
        };
      }, {}),

      ...unAdvertisedPlacements.reduce((acc: Placements, placement) => {
        return {
          ...acc,
          [placement.type]: {
            enabled: false,
            message_type: placement.message_types[0],
            custom_parameters: "foo=bar\ncontext_id=$Context.id",
            icon_uri: `${window.location.origin}/api/apps/${props.app.id}/icon.svg`,
            roles: "",
            label: `${props.app.name} (${placement.description})`,
          },
        };
      }, {}),
    });
  }, []);

  /**
   * Determines the number of placements to display by default
   * hiding the rest behind a "show more" button
   */
  const DefaultPlacementDisplayCount = 5;

  // if the number of all placements is less than 6, show all
  // and don't show the "show more" button

  // if the number of all placements is more than 6, show the first 5

  // if we are expanded, or the number of placements is less than 6, show all

  return (
    <div>
      <h3>Placements</h3>
      {advertisedPlacements.length > 0 ? (
        <>
          <h6>Supported by this Platform</h6>
          {advertisedPlacements.map((placement, i) =>
            !expanded && i > DefaultPlacementDisplayCount ? null : (
              <>
                {/* <Pre>{JSON.stringify(placement, null, 2)}</Pre> */}
                <PlacementConfig placement={placement} />
              </>
            )
          )}
        </>
      ) : null}
      {unAdvertisedPlacements.length > 0 &&
      (expanded ||
        unAdvertisedPlacements.length + advertisedPlacements.length <=
          DefaultPlacementDisplayCount) ? (
        <>
          <h6>Standard placements not advertised as supported</h6>
          {unAdvertisedPlacements.length > 0 && (
            <>
              {unAdvertisedPlacements.map((placement, i) =>
                !expanded && i > DefaultPlacementDisplayCount ? null : (
                  // <Pre>{JSON.stringify(placement, null, 2)}</Pre>
                  <PlacementConfig placement={placement} />
                )
              )}
            </>
          )}
        </>
      ) : null}

      <div
        className="w-full items-center justify-center flex flex-row cursor-pointer"
        onClick={() => {
          toggleExpanded();
        }}
      >
        {expanded ? (
          <>
            Show Less <ChevronUpIcon className="ml-2 w-5 h-5" />
          </>
        ) : (
          <>
            Show More <ChevronDownIcon className="ml-2 w-5 h-5" />
          </>
        )}
      </div>
    </div>
  );
};

const PossibleMessageTypes = [
  {
    type: "LtiResourceLinkRequest",
  },
  {
    type: "LtiDeepLinkingRequest",
  },
];

// type: S.string,
// target_link_uri: S.optional(Url),
// custom_parameters: S.optional(CustomParameters),
// icon_uri: S.optional(S.string),
// placements: S.optional(S.array(S.string)),
// roles: S.optional(S.array(S.string)),

const known = <K extends keyof typeof CanvasPlacementTypes>(
  k: K,
  v: string
) => ({ type: CanvasPlacementTypes[k], description: v });

const KnownPlacements = [
  known("GlobalNavigation", "Global Navigation"),
  known("CourseNavigation", "Course Navigation"),
  known("AccountNavigation", "Account Navigation"),
  known("UserNavigation", "User Navigation"),
  known("HomeworkSubmission", "Homework Submission"),
  known("DiscussionTopicMenu", "Discussion Topic Menu"),
  known("DiscussionTopicIndexMenu", "Discussion Topic Index Menu"),
  known("AssignmentMenu", "Assignment Menu"),
  known("AssignmentSelection", "Assignment Selection"),
  known("AssignmentEdit", "Assignment Edit"),
  known("AssignmentView", "Assignment View"),
  known("AssignmentGroupMenu", "Assignment Group Menu"),
  known("AssignmentIndexMenu", "Assignment Index Menu"),
  known("CourseAssignmentsMenu", "Course Assignments Menu"),
  known("CourseHomeSubNavigation", "Course Home Sub-Navigation"),
  known("CourseSettingsSubNavigation", "Course Settings Sub-Navigation"),
  known("EditorButton", "Editor Button"),
  known("ModuleMenu", "Module Menu"),
  known("ModuleIndexMenu", "Module Index Menu"),
  known("ModuleIndexMenuModal", "Module Index Menu Modal"),
  known("ModuleGroupMenu", "Module Group Menu"),
  known("ModuleMenuModal", "Module Menu Modal"),
  known("FileMenu", "File Menu"),
  known("FileIndexMenu", "File Index Menu"),
  known("WikiPageMenu", "Wiki Page Menu"),
  known("WikiIndexMenu", "Wiki Index Menu"),
  known("QuizMenu", "Quiz Menu"),
  known("QuizIndexMenu", "Quiz Index Menu"),
  known("ConferenceSelection", "Conference Selection"),
  known("Collaboration", "Collaboration"),
  known("MigrationSelection", "Migration Selection"),
  known("PostGrades", "Post Grades"),
  known("SimilarityDetection", "Similarity Detection"),
  known("StudentContextCard", "Student Context Card"),
  known("SubmissionTypeSelection", "Submission Type Selection"),
  known("ToolConfiguration", "Tool Configuration"),
  known("TopNavigation", "Top Navigation"),
  known("UserNavigation", "User Navigation"),
  known("LinkSelection", "Link Selection"),
] as const;

const parseCustomParams = (custom_parameters: string): Record<string, string> =>
  custom_parameters
    .split("\n")
    .filter((s) => s.trim() !== "")
    .map((s) => s.split("="))
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {}
    );

const PlacementConfig = (props: {
  placement: {
    type: string;
    message_types: string[];
    description: string;
  };
}) => {
  const placement = props.placement;

  const {
    placements,
    togglePlacement,
    setPlacements,
    updateCustomParameters,
    updateIconUri,
    updateLabel,
    updateMessageType,
    updateRoles,
  } = usePlacementsStore((state) => state);

  return (
    <div className="form-control" key={placement.type}>
      <label className="label cursor-pointer justify-normal">
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => togglePlacement(placement.type)}
          checked={
            typeof placements[placement.type] !== "undefined" &&
            placements[placement.type].enabled === true
          }
        />
        <span className="label-text ml-2">{placement.description}</span>
      </label>
      {typeof placements[placement.type] !== "undefined" &&
        placements[placement.type].enabled === true && (
          <div className="ml-10 grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Label"
              className="input input-bordered w-full max-w-xs"
              onChange={updateLabel(placement.type)}
              value={placements[placement.type].label}
            />
            <select
              className="select select-bordered w-full max-w-xs"
              disabled={placement.message_types.length === 1}
              onChange={updateMessageType(placement.type)}
            >
              {placement.message_types.map((mt) => (
                <option key={mt}>{mt}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Roles"
              className="input input-bordered w-full max-w-xs"
              onChange={updateRoles(placement.type)}
              value={placements[placement.type].roles}
            />
            <input
              type="text"
              placeholder="Icon Url"
              className="input input-bordered w-full max-w-xs"
              onChange={updateIconUri(placement.type)}
              value={placements[placement.type].icon_uri}
            />
            <textarea
              className="textarea textarea-bordered"
              placeholder="Custom Parameters (key=value format)"
              onChange={updateCustomParameters(placement.type)}
              value={placements[placement.type].custom_parameters}
            ></textarea>
          </div>
        )}
    </div>
  );
};
