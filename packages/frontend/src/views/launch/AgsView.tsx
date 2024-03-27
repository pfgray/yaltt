import { Option, pipe } from "effect";
import { extractAgsEndpointClaim, extractDeploymentIdClaim } from "lti-model";
import { Launch } from "./Launch";
import { LaunchCollapsible } from "./LaunchCollapsible";

type AgsFormProps = {
  launch: Launch;
};

export const AgsView = ({ launch }: AgsFormProps) =>
  pipe(
    extractAgsEndpointClaim(launch.id_token),
    Option.bindTo("ags"),
    Option.bind("deploymentId", () =>
      extractDeploymentIdClaim(launch.id_token)
    ),
    Option.map(({ ags, deploymentId }) => (
      <LaunchCollapsible title="Deep Linking" initialOpen={true}>
        <div>lineitem</div>
        <pre>{ags.lineitem}</pre>
        <div>lineitems</div>
        <pre>{ags.lineitems}</pre>
        {/* <AgsForm
          AgsSettings={dl}
          registrationId={launch.registration.id}
          deploymentId={deploymentId}
          appId={launch.app.id}
        /> */}
      </LaunchCollapsible>
    )),
    Option.getOrNull
  );
