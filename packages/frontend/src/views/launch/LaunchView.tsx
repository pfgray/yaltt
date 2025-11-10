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
import { DeepLinkingView } from "./DeepLinkingView";
import { AgsView } from "./AgsView";
import { PostMessageForm } from "./PostMessageForm";

const fetchLaunch = (launchId: number) =>
  getDecode(Launch)(`/api/launch/${launchId}`);

export const LaunchView = () => {
  const parsedParamsQuery = useParsedParamsQuery(
    S.struct({
      launchId: S.NumberFromString,
    }),
    S.struct({
      placement: S.optional(S.string),
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
                <AgsView launch={launch} />
                <DeepLinkingView launch={launch} />
                <RawLaunch launch={launch} />
                <TokenFetcher launch={launch} />
                <PostMessageForm launch={launch} />
              </div>
            </div>
          )}
        </WithRequest>
      ),
    })
  );
};
