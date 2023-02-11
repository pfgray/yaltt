import { pipe } from "@fp-ts/core/Function";
import * as S from "@fp-ts/schema";
import { getDecode, jsonBody, post } from "../../../lib/api/request";
import { provideRequestService } from "../../../lib/api/requestServiceImpl";
import * as F from "../../../lib/forms/form";
import { useSchemaParams } from "../../../lib/react-router/useSchemaParams";
import { List } from "../List";
import * as E from "@fp-ts/core/Either";
import {
  Registration,
  stringToInteger,
  YalttToolConfiguration,
  CanvasPlatformConfiguration,
  match,
} from "@yaltt/model";
import * as Eff from "@effect/io/Effect";
import { useParams } from "react-router-dom";
import { Link } from "@mui/material";

const columns = [
  "Id",
  {
    name: "JWKS Url",
    options: {
      filter: true,
      customBodyRender: (value: Registration) => {
        return (
          <Link
            href={`/api/registrations/${value.id}/jwks`}
          >{`/api/registrations/${value.id}/jwks`}</Link>
        );
      },
    },
  },
  "Tool Configuration",
  "Platform Configuration",
];
const newRegistrationForm = (appId: number) =>
  F.mkForm({
    toolConfiguration: F.json(
      "Tool Configuration",
      JSON.stringify(YalttToolConfiguration("abcd"), null, 2)
    ),
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
  pipe(getDecode(S.array(Registration))(`/api/apps/${appId}/registrations`));

export const Registrations = () => {
  const params = useSchemaParams(paramSchema);

  return pipe(
    params,
    E.match(
      (err) => (
        <div>
          Error parsing app id from params{" "}
          <pre>{JSON.stringify(err, null, 2)}</pre>
        </div>
      ),
      ({ appId }) => (
        <List
          width="90vw"
          newForm={newRegistrationForm(appId)}
          editForm={newRegistrationForm(appId)}
          entityName="Registration"
          fetchValues={fetchRegistrations(appId)}
          renderValues={(registrations) => ({
            columns,
            rows: registrations.map((r) => [
              r.id,
              r as any,
              r.tool_configuration.jwks_uri,
              r.platform_configuration.issuer,
            ]),
          })}
        ></List>
      )
    )
  );
};
