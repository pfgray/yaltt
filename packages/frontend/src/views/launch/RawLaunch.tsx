import { Pre } from "../../lib/ui/Pre";
import { Launch } from "@yaltt/model/src/registration/Launch";
import { LaunchCollapsible } from "./LaunchCollapsible";

export type RawLaunchProps = {
  launch: Launch;
};

export const RawLaunch = (props: RawLaunchProps) => {
  const { launch } = props;
  const isLti11 = launch.registration.type === "lti11";

  return (
    <LaunchCollapsible
      title={
        isLti11 ? "Raw Launch (LTI 1.1 Parameters)" : "Raw Launch (LTI 1.3 JWT)"
      }
    >
      <Pre>{JSON.stringify(launch.id_token, null, 2)}</Pre>
    </LaunchCollapsible>
  );
};
