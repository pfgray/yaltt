import * as S from "@effect/schema/Schema";
import {
  App,
  AppId,
  getRegistrationFromPlatform,
  Registration,
  RegistrationId,
  sendRegistrationUpdate,
} from "@yaltt/model";
import { pipe } from "effect";
import { fetchBodyFromEndpoint, fetchFromEndpoint } from "endpoint-ts-fetch";
import { CreatedToolConfiguration, PlatformConfiguration } from "lti-model";
import { withParsedParams } from "../../lib/api/WithParsedParams";
import { WithRequest } from "../../lib/api/WithRequest";
import { DynamicRegistrationForm } from "../lists/registrations/DynamicRegistrationForm";

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
