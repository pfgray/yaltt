import { formatError } from "@effect/schema/TreeFormatter";
import { App, match, Registration } from "@yaltt/model";
import { Effect, pipe } from "effect";
import * as React from "react";
import { Pre } from "../../../lib/ui/Pre";
import {
  useScopeStore,
  useExtraScopesStore,
  ServicesSupported,
  isCanvas,
} from "./DynamicRegistration";
import { usePlacementsStore } from "./usePlacementsStore";
import { useInstallingState } from "./useInstallingState";
import {
  CreatedToolConfiguration,
  LtiMessage,
  PlatformConfiguration,
} from "lti-model";
import { InstallingStateError } from "./DynamicRegistrationSimple";
import { provideRequestService } from "../../../lib/api/requestServiceImpl";
import { MessageTypes } from "./shared/MessageTypes";
import { CanvasPrivacyLevel, CanvasPrivacyLevels } from "canvas-lti-model";
import * as O from "effect/Option";

export type DynamicRegistrationFormProps = {
  app: App;
  platformConfiguration: PlatformConfiguration;
  openidConfig?: unknown;
  openid_configuration?: string;
  confirmText?: string;
  onConfirm: (options: {
    platformConfiguration: PlatformConfiguration;
    messages: Array<LtiMessage>;
    scopes: Array<string>;
    customParameters: Record<string, string>;
    privacyLevel: CanvasPrivacyLevel;
    toolId?: string;
    disableReinstall?: boolean;
  }) => Effect.Effect<unknown, InstallingStateError, never>;
  editingRegistration?: Registration;
  editingToolConfiguration?: CreatedToolConfiguration;
};

// topCustomParams
// toolId
// scopes
// placements: Placements

export const DynamicRegistrationForm = (
  props: DynamicRegistrationFormProps
) => {
  const {
    app,
    openidConfig,
    platformConfiguration,
    openid_configuration,
    editingRegistration,
    editingToolConfiguration,
    confirmText,
    onConfirm,
  } = props;

  const [topCustomParams, setTopCustomParams] = React.useState(
    editingRegistration
      ? Object.entries(editingRegistration.custom_parameters)
          .map(([k, v]) => `${k}=${v}`)
          .join("\n")
      : ""
  );
  const [toolId, setToolId] = React.useState(
    "toolid-" + Math.floor(Math.random() * 1000)
  );
  const [includeToolId, setIncludeToolId] = React.useState(false);
  const [disableReinstall, setDisableReinstall] = React.useState(false);
  const scopes = useScopeStore((state) => state.scopes);
  const [privacyLevel, setPrivacyLabel] = React.useState<CanvasPrivacyLevel>(
    CanvasPrivacyLevels.public
  );
  const extraScopes = useExtraScopesStore((state) =>
    state.extraScopes
      .split("\n")
      .map((a) => a.trim())
      .filter((s) => s !== "")
  );
  const { placements, initializePlacements } = usePlacementsStore(
    (state) => state
  );
  const { install, installTool } = useInstallingState((state) => state);

  return (
    <div className="flex flex-col items-center w-full">
      <article className="prose mt-5">
        <h1 className="text-center">
          {openidConfig
            ? `Installing ${app.name} into 
          ${
            (openidConfig as any)[
              "https://purl.imsglobal.org/spec/lti-platform-configuration"
            ]["https://canvas.instructure.com/lti/account_name"]
          }
          `
            : ""}
        </h1>
        {editingToolConfiguration ? (
          <h1>Settings for {editingToolConfiguration?.client_name}</h1>
        ) : null}
        {pipe(
          editingRegistration,
          O.fromNullable,
          O.flatMap((r) => r.registration_config_url),
          O.map((url) => (
            <a href={url} target="_blank">
              View in platform
            </a>
          )),
          O.getOrNull
        )}
        <MessageTypes
          platformConfiguration={platformConfiguration}
          app={app}
          editingToolConfiguration={editingToolConfiguration}
        />
        <div className="divider"></div>
        <ServicesSupported
          platformConfiguration={platformConfiguration}
          editingToolConfiguration={editingToolConfiguration}
        />
        <div className="divider"></div>
        <div>
          <h3>Other Configuration Options</h3>
          <div className="form-control">
            <label htmlFor="custom-parameters">Custom Parameters</label>
            <textarea
              id="custom-parameters"
              className="textarea textarea-bordered"
              placeholder="Custom Parameters (key=value format)"
              onChange={(ev) => setTopCustomParams(ev.currentTarget.value)}
              value={topCustomParams}
            ></textarea>
            {isCanvas(platformConfiguration) && (
              <>
                <label
                  htmlFor="privacy_level"
                  className="label cursor-pointer justify-normal mt-3"
                >
                  Privacy Level
                </label>
                <select
                  id="privacy_level"
                  className="select select-bordered w-full max-w-xs"
                  onChange={(event) =>
                    setPrivacyLabel(
                      event.currentTarget.value as CanvasPrivacyLevel
                    )
                  }
                >
                  {Object.values(CanvasPrivacyLevels).map((pl) => (
                    <option selected={pl === privacyLevel} key={pl}>
                      {pl}
                    </option>
                  ))}
                </select>
                <label className="label cursor-pointer justify-normal mt-3">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => {
                      setIncludeToolId(!includeToolId);
                    }}
                    checked={includeToolId}
                  />
                  <span className="label-text ml-2">Include Tool ID</span>
                </label>
                {includeToolId && (
                  <>
                    <label htmlFor="tool-id" className="mt-1">
                      Tool Id
                    </label>
                    <input
                      id="tool-id"
                      type="text"
                      className="input input-bordered mb-3"
                      disabled={!includeToolId}
                      onChange={(ev) =>
                        setToolId(ev.currentTarget.value?.trim())
                      }
                      value={toolId}
                    />
                  </>
                )}
                <label className="label cursor-pointer justify-normal mt-3">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => {
                      setDisableReinstall(!disableReinstall);
                    }}
                    checked={disableReinstall}
                  />
                  <span className="label-text ml-2">
                    Disable Reinstallation
                  </span>
                </label>
              </>
            )}
          </div>
        </div>
        <div className="w-full flex justify-end flex-row">
          <button
            className="btn btn-primary"
            onClick={() => {
              pipe(
                onConfirm({
                  platformConfiguration: platformConfiguration,
                  customParameters: parseCustomParams(topCustomParams),
                  toolId: includeToolId ? toolId : undefined,
                  scopes: [...scopes, ...extraScopes],
                  privacyLevel: privacyLevel,
                  disableReinstall: disableReinstall,
                  messages: Object.entries(placements)
                    .filter(([_, v]) => v.enabled)
                    .map(([placement, v]) => ({
                      type: v.message_type as string,
                      placements: [placement],
                      custom_parameters: parseCustomParams(
                        v.custom_parameters || ""
                      ),
                      icon_uri: v.icon_uri || undefined,
                      roles: v.roles
                        ? v.roles.split(",").map((r) => r.trim())
                        : undefined,
                      label: v.label,
                    })),
                }),
                (a) => a,
                installTool,
                (a) => a,
                provideRequestService,
                (a) => a,
                Effect.runCallback
              );
            }}
            disabled={false}
          >
            {pipe(
              install,
              match({
                initial: () => confirmText || "Install",
                loading: () => `${confirmText || "Install"}ing...`,
                loaded: () => `${confirmText || "Install"}ed`,
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
                        <Pre>{JSON.stringify(fe.reason, null, 2)}</Pre>
                      </>
                    ),
                    fetch_parse_json_error: (pe) => (
                      <>
                        <div>Unable to parse json:</div>
                        <Pre>{pe.original}</Pre>
                        <div>Error:</div>
                        <Pre>{JSON.stringify(pe.error)}</Pre>
                      </>
                    ),
                    fetch_parse_error: (pe) => (
                      <>
                        <div>Error parsing response:</div>
                        <Pre>{formatError(pe.reason)}</Pre>
                        <div>Original data response:</div>
                        <Pre>{JSON.stringify(pe.original, null, 2)}</Pre>
                      </>
                    ),
                    encode_error: (ee) => (
                      <>
                        <div>Error Encoding data:</div>
                        <Pre>{formatError(ee.error)}</Pre>
                        <div>Original encode:</div>
                        <Pre>{JSON.stringify(ee.actual, null, 2)}</Pre>
                      </>
                    ),
                  })
                )}
              </div>
            ),
          })
        )}
        <div className="divider"></div>
        {openidConfig ? (
          <>
            <h3>Raw Platform Configuration</h3>
            <Pre>{JSON.stringify(openidConfig, null, 2)}</Pre>
          </>
        ) : null}
        {openid_configuration ? (
          <>
            <h6>Fetched from:</h6>
            <Pre>{openid_configuration}</Pre>
          </>
        ) : null}
      </article>
    </div>
  );
};

export const parseCustomParams = (
  custom_parameters: string
): Record<string, string> =>
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
