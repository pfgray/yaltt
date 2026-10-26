import * as S from "@effect/schema/Schema";
import {
  App,
  AppId,
  getRegistrationFromPlatform,
  Registration,
  RegistrationId,
  sendRegistrationUpdate,
  sendRegistrationJsonUpdate,
  match,
} from "@yaltt/model";
import { Effect, pipe } from "effect";
import * as React from "react";
import { Link } from "react-router-dom";
import { fetchBodyFromEndpoint, fetchFromEndpoint } from "endpoint-ts-fetch";
import { CreatedToolConfiguration, PlatformConfiguration } from "lti-model";
import { withParsedParams } from "../../lib/api/WithParsedParams";
import { WithRequest } from "../../lib/api/WithRequest";
import { DynamicRegistrationForm } from "../lists/registrations/DynamicRegistrationForm";
import { useInstallingState } from "../lists/registrations/useInstallingState";
import { provideRequestService } from "../../lib/api/requestServiceImpl";
import { Pre } from "../../lib/ui/Pre";

export const RegistrationEditWrapper = () =>
  withParsedParams({
    appId: S.compose(S.NumberFromString, AppId),
    registrationId: S.compose(S.NumberFromString, RegistrationId),
  })(({ params }) => {
    return (
      <WithRequest eff={fetchRegistrationFromPlatform(params)}>
        {({ registration, app, rawToolConfiguration, toolConfiguration }) => {
          // Registration editing is only supported for LTI 1.3
          if (registration.type === "lti11") {
            return (
              <div className="alert alert-warning">
                <span>
                  Registration editing is not supported for LTI 1.1
                  registrations.
                </span>
              </div>
            );
          }

          return (
            <RegistrationEdit
              app={app}
              registration={registration}
              platformConfiguration={registration.platform_configuration}
              rawToolConfiguration={rawToolConfiguration}
              toolConfiguration={toolConfiguration}
            />
          );
        }}
      </WithRequest>
    );
  });

type RegistrationEditProps = {
  registration: Registration;
  app: App;
  platformConfiguration: PlatformConfiguration;
  toolConfiguration: CreatedToolConfiguration;
  rawToolConfiguration: unknown;
};

const fetchRegistrationFromPlatform = fetchFromEndpoint(
  getRegistrationFromPlatform
);

export const RegistrationEdit = (props: RegistrationEditProps) => {
  const {
    registration,
    app,
    platformConfiguration,
    toolConfiguration,
    rawToolConfiguration,
  } = props;
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col gap-4">
        {/* <pre>{JSON.stringify(props.toolConfiguration, null, 2)}</pre> */}
        <DynamicRegistrationForm
          app={app}
          platformConfiguration={platformConfiguration}
          editingRegistration={registration}
          editingToolConfiguration={toolConfiguration}
          confirmText="Update"
          loadingText="Updating"
          loadedText="Updated"
          onConfirm={(options) =>
            pipe(
              options,
              (a) => {
                console.log("Sending: ", options);
                return a;
              },
              fetchBodyFromEndpoint(sendRegistrationUpdate)({
                appId: app.id,
                registrationId: registration.id,
              })
            )
          }
        />
      </div>
    </div>
  );
};

export const RegistrationEditJsonWrapper = () =>
  withParsedParams({
    appId: S.compose(S.NumberFromString, AppId),
    registrationId: S.compose(S.NumberFromString, RegistrationId),
  })(({ params }) => {
    return (
      <WithRequest eff={fetchRegistrationFromPlatform(params)}>
        {({ registration, app, rawToolConfiguration }) => {
          // Registration editing is only supported for LTI 1.3
          if (registration.type === "lti11") {
            return (
              <div className="alert alert-warning">
                <span>
                  Registration editing is not supported for LTI 1.1
                  registrations.
                </span>
              </div>
            );
          }

          return (
            <RegistrationEditJson
              app={app}
              registration={registration}
              rawToolConfiguration={rawToolConfiguration}
            />
          );
        }}
      </WithRequest>
    );
  });

type RegistrationEditJsonProps = {
  registration: Registration;
  app: App;
  rawToolConfiguration: unknown;
};

export const RegistrationEditJson = (props: RegistrationEditJsonProps) => {
  const { registration, app, rawToolConfiguration } = props;
  const [json, setJson] = React.useState(
    JSON.stringify(rawToolConfiguration, null, 2)
  );
  const { install, installTool } = useInstallingState((state) => state);

  const parsed = React.useMemo(() => {
    try {
      return { ok: true as const, value: JSON.parse(json) as unknown };
    } catch (e) {
      return { ok: false as const, message: String(e) };
    }
  }, [json]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col gap-4">
        <article className="prose max-w-none">
          <h1>Settings for {app.name}</h1>
          <div>
            <Link
              to={`/apps/${app.id}/registrations/${registration.id}/configuration`}
            >
              Edit using the form
            </Link>
          </div>
          <div className="form-control mt-3">
            <label htmlFor="tool-configuration-json">
              Tool Configuration JSON
            </label>
            <textarea
              id="tool-configuration-json"
              className="textarea textarea-bordered font-mono h-96"
              placeholder="Paste tool configuration JSON"
              onChange={(ev) => setJson(ev.currentTarget.value)}
              value={json}
            ></textarea>
            {!parsed.ok ? (
              <div className="text-error mt-1">Invalid JSON: {parsed.message}</div>
            ) : null}
          </div>
          <div className="w-full flex justify-end flex-row mt-3">
            <button
              className="btn btn-primary"
              disabled={!parsed.ok}
              onClick={() => {
                if (!parsed.ok) return;
                pipe(
                  { toolConfiguration: parsed.value },
                  fetchBodyFromEndpoint(sendRegistrationJsonUpdate)({
                    appId: app.id,
                    registrationId: registration.id,
                  }),
                  installTool,
                  provideRequestService,
                  Effect.runCallback
                );
              }}
            >
              {pipe(
                install,
                match({
                  initial: () => "Update",
                  loading: () => "Updating",
                  loaded: () => "Updated",
                  failed: () => "Failed (Try Again)",
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
                <Pre>{JSON.stringify(error, null, 2)}</Pre>
              ),
            })
          )}
        </article>
      </div>
    </div>
  );
};
