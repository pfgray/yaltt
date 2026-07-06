import { match } from "@yaltt/model";
import { pipe } from "effect";
import * as React from "react";
import { Request } from "../DynamicRegistration";
import { InstallingStateError } from "../useInstallingState";

type InstallButtonProps = {
  install: Request<InstallingStateError, unknown>;
  onClick: () => void;
  className?: string;
};

export const InstallButton: React.FC<InstallButtonProps> = ({
  install,
  onClick,
  className = "btn btn-primary",
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={pipe(
        install,
        match({
          initial: () => false,
          loading: () => true,
          loaded: () => true,
          failed: () => false,
        })
      )}
    >
      {pipe(
        install,
        match({
          initial: () => "Install",
          loading: () => "Installing...",
          loaded: () => "Installed",
          failed: () => "Failed (Try Again)",
        })
      )}
    </button>
  );
};
