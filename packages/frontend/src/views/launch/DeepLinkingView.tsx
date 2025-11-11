import { Option, pipe } from "effect";
import {
  extractDeepLinkingSettingsClaim,
  extractDeploymentIdClaim,
} from "lti-model";
import { DeepLinkingForm } from "./DeepLinkingForm";
import { Launch } from "@yaltt/model/src/registration/Launch";
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
          registrationId={launch.registration.id}
          deploymentId={deploymentId}
          appId={launch.app.id}
        />
      </LaunchCollapsible>
    )),
    Option.getOrNull
  );
