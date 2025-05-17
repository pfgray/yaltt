import * as S from "@effect/schema/Schema";
import { App, Registration, stringToInteger } from "@yaltt/model";
import { Either, pipe } from "effect";
import { Link } from "react-router-dom";
import { YalttLayout } from "../../../YalttLayout";
import { WithRequest } from "../../../lib/api/WithRequest";
import { getDecode } from "../../../lib/api/request";
import { useParsedParams } from "../../../lib/react-router/useSchemaParams";
import { Pre } from "../../../lib/ui/Pre";

const paramSchema = S.struct({ appId: stringToInteger });

const AppWithRegistrations = App.pipe(
  S.extend(
    S.struct({
      registrations: S.array(Registration),
    })
  )
);

type AppWithRegistrations = S.Schema.To<typeof AppWithRegistrations>;

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
          <Pre>{JSON.stringify(err, null, 2)}</Pre>
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
