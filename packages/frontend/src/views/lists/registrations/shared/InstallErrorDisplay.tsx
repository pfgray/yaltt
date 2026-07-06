import { formatError } from "@effect/schema/TreeFormatter";
import { match } from "@yaltt/model";
import { pipe } from "effect";
import * as React from "react";
import { Pre } from "../../../../lib/ui/Pre";
import { Request } from "../DynamicRegistration";
import { InstallingStateError } from "../useInstallingState";

type InstallErrorDisplayProps = {
  install: Request<InstallingStateError, unknown>;
};

export const InstallErrorDisplay: React.FC<InstallErrorDisplayProps> = ({
  install,
}) => {
  return pipe(
    install,
    match({
      initial: () => <></>,
      loading: () => <></>,
      loaded: () => <></>,
      failed: ({ error }) => (
        <div className="w-full flex justify-end flex-col">
          {pipe(
            error,
            match({
              fetch_exception: (fe) => (
                <>
                  <div>Error fetching {fe.url}</div>
                  <Pre>{JSON.stringify(fe.reason, null, 2)}</Pre>
                </>
              ),
              fetch_parse_json_error: (pe) => (
                <>
                  <div>Unable to parse json:</div>
                  <Pre>{pe.original}</Pre>
                  <div>Error:</div>
                  <Pre>{JSON.stringify(pe.error)}</Pre>
                </>
              ),
              fetch_parse_error: (pe) => (
                <>
                  <div>Error parsing response:</div>
                  <Pre>{formatError(pe.reason)}</Pre>
                  <div>Original data response:</div>
                  <Pre>{JSON.stringify(pe.original, null, 2)}</Pre>
                </>
              ),
              encode_error: (ee) => (
                <>
                  <div>Error Encoding data:</div>
                  <Pre>{formatError(ee.error)}</Pre>
                  <div>Original encode:</div>
                  <Pre>{JSON.stringify(ee.actual, null, 2)}</Pre>
                </>
              ),
            })
          )}
        </div>
      ),
    })
  );
};
