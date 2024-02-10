import { Launch } from "./Launch";
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
import { RawLaunch } from "./RawLaunch";
import { LaunchCollapsible } from "./LaunchCollapsible";

type DeepLinkingFormProps = {
  launch: Launch;
};

export const DeepLinkingView = ({ launch }: DeepLinkingFormProps) =>
  pipe(
    extractDeepLinkingSettingsClaim(launch.id_token),
    Option.bindTo("dl"),
    Option.bind("deploymentId", () =>
      extractDeploymentIdClaim(launch.id_token)
    ),
    Option.map(({ dl, deploymentId }) => (
      <LaunchCollapsible title="Deep Linking" initialOpen={true}>
        <DeepLinkingForm
          deepLinkingSettings={dl}
          registrationId={launch.registration_id}
          deploymentId={deploymentId}
          appId={launch.appId}
        />
      </LaunchCollapsible>
    )),
    Option.getOrNull
  );
