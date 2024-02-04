import { Either, Option, pipe } from "effect";
import { useParsedParamsQuery } from "../../lib/react-router/useParsedParamsQuery";
import * as S from "@effect/schema/Schema";
import { WithRequest } from "../../lib/api/WithRequest";
import { getDecode } from "../../lib/api/request";
import {
  extractDeepLinkingSettingsClaim,
  extractDeploymentIdClaim,
} from "lti-model";
import { DeepLinkingForm } from "./DeepLinkingForm";
import { TokenFetcher } from "./TokenFetcher";
import { Launch } from "./Launch";
import { RawLaunch } from "./RawLaunch";

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
            <div className="p-4">
              <div className="flex flex-col gap-2">
                {pipe(
                  extractDeepLinkingSettingsClaim(launch.id_token),
                  Option.bindTo("dl"),
                  Option.bind("deploymentId", () =>
                    extractDeploymentIdClaim(launch.id_token)
                  ),
                  Option.map(({ dl, deploymentId }) => (
                    <DeepLinkingForm
                      deepLinkingSettings={dl}
                      registrationId={launch.registration_id}
                      deploymentId={deploymentId}
                      appId={launch.appId}
                    />
                  )),
                  Option.getOrNull
                )}
                <RawLaunch launch={launch} />
                <TokenFetcher launch={launch} />
              </div>
            </div>
          )}
        </WithRequest>
      ),
    })
  );
};
