import { Launch } from "./Launch";
import { LaunchCollapsible } from "./LaunchCollapsible";

export type RawLaunchProps = {
  launch: Launch;
};

export const RawLaunch = (props: RawLaunchProps) => {
  const { launch } = props;

  return (
    <LaunchCollapsible title="Raw Launch">
      <div className="prose">
        <pre>{JSON.stringify(launch.id_token, null, 2)}</pre>
      </div>
    </LaunchCollapsible>
  );
};
