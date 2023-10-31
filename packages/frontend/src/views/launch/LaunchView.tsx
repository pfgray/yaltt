import { Either, pipe } from "effect";
import { useParsedParamsQuery } from "../../lib/react-router/useParsedParamsQuery";
import * as S from "@effect/schema/Schema";
import { WithRequest } from "../../lib/api/WithRequest";
import { getDecode } from "../../lib/api/request";

const Launch = S.struct({
  id: S.number,
  created: S.Date,
  id_token: S.unknown,
  registration_id: S.number,
  person_id: S.optional(S.number),
  context_id: S.optional(S.number),
});

const fetchLaunch = (launchId: number) =>
  getDecode(Launch)(`/api/launch/${launchId}`);

export const LaunchView = () => {
  const parsedParamsQuery = useParsedParamsQuery(
    S.struct({
      launchId: S.numberFromString(S.string),
    }),
    S.struct({
      placement: S.string,
    })
  );

  return pipe(
    parsedParamsQuery,
    Either.match({
      onLeft: () => <div>Invalid params</div>,
      onRight: ({ query, params }) => (
        <WithRequest eff={fetchLaunch(params.launchId)}>
          {(launch) => (
            <div>
              <div>Launch ID: {params.launchId}</div>
              <div>Placement: {query.placement}</div>
              <div>
                Launch: <pre>{JSON.stringify(launch, null, 2)}</pre>
              </div>
            </div>
          )}
        </WithRequest>
      ),
    })
  );
};
