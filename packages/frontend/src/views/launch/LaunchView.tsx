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
import { getLaunch, LaunchId } from "@yaltt/model";
import { RawLaunch } from "./RawLaunch";
import { DeepLinkingView } from "./DeepLinkingView";
import { Lti11ContentItemView } from "./Lti11ContentItemView";
import { AgsView } from "./AgsView";
import { PostMessageForm } from "./PostMessageForm";
import { fetchFromEndpoint } from "endpoint-ts-fetch";

const fetchLaunch = fetchFromEndpoint(getLaunch);

export const LaunchView = () => {
  const parsedParamsQuery = useParsedParamsQuery(
    S.struct({
      launchId: S.compose(S.NumberFromString, LaunchId),
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
        <WithRequest eff={fetchLaunch(params)}>
          {(launch) => (
            <div className="p-4">
              <div className="mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    launch.registration.type === "lti11"
                      ? "bg-orange-100 text-orange-800 border border-orange-300"
                      : "bg-blue-100 text-blue-800 border border-blue-300"
                  }`}
                >
                  {launch.registration.type === "lti11"
                    ? "LTI 1.1 Launch"
                    : "LTI 1.3 Launch"}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <AgsView launch={launch} />
                <DeepLinkingView launch={launch} />
                <Lti11ContentItemView launch={launch} />
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
