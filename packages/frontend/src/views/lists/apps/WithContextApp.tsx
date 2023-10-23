import { pipe, Either, Option, ReadonlyArray, Effect } from "effect";
import * as S from "@effect/schema/Schema";
import { getDecode, jsonBody, post } from "../../../lib/api/request";
import { provideRequestService } from "../../../lib/api/requestServiceImpl";
import * as F from "../../../lib/forms/form";
import { useParsedParams } from "../../../lib/react-router/useSchemaParams";
import { List, NewEntityForm } from "../List";
import {
  App,
  Registration,
  stringToInteger,
  CanvasPlatformConfiguration,
  User,
} from "@yaltt/model";
import { Link, useParams } from "react-router-dom";
import { YalttLayout } from "../../../YalttLayout";
import { WithRequest } from "../../../lib/api/WithRequest";
import React from "react";

const paramSchema = S.struct({ appId: stringToInteger });

const AppWithRegistrations = App.pipe(
  S.extend(
    S.struct({
      registrations: S.array(Registration),
    })
  )
);

type AppWithRegistrations = S.To<typeof AppWithRegistrations>;

const fetchApp = (appId: number) =>
  getDecode(AppWithRegistrations)(`/api/apps/${appId}`);

type WithContextAppProps = {
  children: (app: AppWithRegistrations) => JSX.Element;
};

export const WithContextApp = (props: WithContextAppProps) => {
  const params = useParsedParams(paramSchema);
  return pipe(
    params,
    Either.match({
      onLeft: (err) => (
        <div>
          Error parsing app id from params{" "}
          <pre>{JSON.stringify(err, null, 2)}</pre>
        </div>
      ),
      onRight: ({ appId }) => (
        <WithRequest eff={fetchApp(appId)}>
          {(app) => (
            <YalttLayout
              header={
                <div className="text-sm breadcrumbs">
                  <ul>
                    <li>
                      <Link className="link" to={`/`}>
                        Apps
                      </Link>
                    </li>
                    <li>{app.name}</li>
                  </ul>
                </div>
              }
            >
              {props.children(app)}
            </YalttLayout>
          )}
        </WithRequest>
      ),
    })
  );
};
