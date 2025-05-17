import * as S from "@effect/schema/Schema";
import {
  CanvasPlatformConfiguration,
  Registration,
  stringToInteger,
} from "@yaltt/model";
import { Either, pipe } from "effect";
import { getDecode, jsonBody, post } from "../../../lib/api/request";
import { provideRequestService } from "../../../lib/api/requestServiceImpl";
import * as F from "../../../lib/forms/form";
import { useParsedParams } from "../../../lib/react-router/useSchemaParams";
import { Pre } from "../../../lib/ui/Pre";

const newRegistrationForm = (appId: number) =>
  F.mkForm({
    platformConfiguration: F.json(
      "Platform Configuration",
      JSON.stringify(CanvasPlatformConfiguration, null, 2)
    ),
  })((fields) =>
    pipe(
      provideRequestService(
        post(`/api/apps/${appId}/registrations`, jsonBody(fields))
      )
    )
  );

const paramSchema = S.struct({ appId: stringToInteger });

const fetchRegistrations = (appId: number) =>
  getDecode(S.array(Registration))(`/api/apps/${appId}/registrations`);

export const Registrations = () => {
  const params = useParsedParams(paramSchema);

  return pipe(
    params,
    Either.match({
      onLeft: (err) => (
        <div>
          Error parsing app id from params{" "}
          <Pre>{JSON.stringify(err, null, 2)}</Pre>
        </div>
      ),
      onRight: ({ appId }) => (
        <></>
        // <List
        //   width="90vw"
        //   newForm={newRegistrationForm(appId)}
        //   editForm={newRegistrationForm(appId)}
        //   entityName="Registration"
        //   fetchValues={fetchRegistrations(appId)}
        //   renderValues={(registrations) => ({
        //     columns,
        //     rows: registrations.map((r) => [
        //       r.id,
        //       `/api/registrations/${r.id}/jwks`,
        //       `/api/registrations/${r.id}/configuration`,
        //       `/api/registrations/${r.id}/canvas_configuration`,
        //       r.platform_configuration.issuer,
        //     ]),
        //   })}
        // ></List>
      ),
    })
  );
};
