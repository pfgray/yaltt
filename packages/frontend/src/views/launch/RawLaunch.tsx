import { Pre } from "../../lib/ui/Pre";
import { Launch } from "@yaltt/model/src/registration/Launch";
import { LaunchCollapsible } from "./LaunchCollapsible";

export type RawLaunchProps = {
  launch: Launch;
};

export const RawLaunch = (props: RawLaunchProps) => {
  const { launch } = props;

  return (
    <LaunchCollapsible title="Raw Launch">
      <Pre>{JSON.stringify(launch.id_token, null, 2)}</Pre>
    </LaunchCollapsible>
  );
};
