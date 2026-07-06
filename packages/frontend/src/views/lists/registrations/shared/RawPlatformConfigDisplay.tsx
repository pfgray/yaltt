import * as React from "react";
import { Pre } from "../../../../lib/ui/Pre";

type RawPlatformConfigDisplayProps = {
  rawConfig: unknown;
  fetchedFromUrl: string;
};

export const RawPlatformConfigDisplay: React.FC<
  RawPlatformConfigDisplayProps
> = ({ rawConfig, fetchedFromUrl }) => {
  return (
    <>
      <div className="divider"></div>
      <h3>Raw Platform Configuration</h3>
      <Pre>{JSON.stringify(rawConfig, null, 2)}</Pre>
      <h6>Fetched from:</h6>
      <Pre>{fetchedFromUrl}</Pre>
    </>
  );
};
