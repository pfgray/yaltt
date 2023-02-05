import { pipe } from "@fp-ts/core/Function";
import * as S from "@fp-ts/schema";
import { getDecode, jsonBody, post } from "../../../lib/api/request";
import { provideRequestService } from "../../../lib/api/requestServiceImpl";
import * as F from "../../../lib/forms/form";
import { useSchemaParams } from "../../../lib/react-router/useSchemaParams";
import { List } from "../List";
import * as E from "@fp-ts/core/Either";
import { Registration, stringToInteger } from "@yaltt/model";

const columns = ["Id", "Tool Configuration", "Platform Configuration"];
const newRegistrationForm = (appId: number) =>
  F.mkForm({
    toolConfiguration: F.textarea("Tool Configuration"),
    platformConfiguration: F.textarea("Platform Configuration"),
  })((fields) =>
    pipe(
      provideRequestService(
        post(
          `/api/apps/${appId}/registrations`,
          jsonBody({
            ...fields,
            appId,
          })
        )
      )
    )
  );

const paramSchema = S.struct({ appId: stringToInteger });

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
          newForm={newRegistrationForm(appId)}
          editForm={newRegistrationForm(appId)}
          entityName="Registration"
          fetchValues={getDecode(S.array(Registration))(
            `/api/apps/${appId}/registrations`
          )}
          renderValues={(registrations) => ({
            columns,
            rows: registrations.map((r) => [
              r.id,
              r.toolConfiguration.jwks_uri,
              r.platformConfiguration.issuer,
            ]),
          })}
        ></List>
      )
    )
  );
};
