import { useState } from "react";
import { Effect, Either, Option, pipe } from "effect";
import { useParsedParamsQuery } from "../../lib/react-router/useParsedParamsQuery";
import * as S from "@effect/schema/Schema";
import { WithRequest } from "../../lib/api/WithRequest";
import { getDecode } from "../../lib/api/request";
import { Button, Form, Textarea } from "react-daisyui";
import {
  App,
  AppId,
  getRegistration,
  getRegistrationFromPlatform,
  Registration,
  RegistrationId,
  sendRegistrationUpdate,
} from "@yaltt/model";
import {
  fetchBodyFromEndpoint,
  fetchFromEndpoint,
} from "../../lib/endpoint-ts/fetchFromEndpoint";
import { Pre } from "../../lib/ui/Pre";
import {
  InferSchemaMap,
  mkWithParsedParams,
  withParsedParams,
  WithParsedParams,
} from "../../lib/api/WithParsedParams";
import { CreatedToolConfiguration, PlatformConfiguration } from "lti-model";
import { DynamicRegistrationForm } from "../lists/registrations/DynamicRegistrationForm";

export const RegistrationEditWrapper = () =>
  withParsedParams({
    appId: S.compose(S.NumberFromString, AppId),
    registrationId: S.compose(S.NumberFromString, RegistrationId),
  })(({ params }) => {
    return (
      <WithRequest eff={fetchRegistrationFromPlatform(params)}>
        {({ registration, app, rawToolConfiguration, toolConfiguration }) => {
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
              }),
              (a) => a
            )
          }
        />
      </div>
    </div>
  );
};
