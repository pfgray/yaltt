import { useState } from "react";
import { Effect, Either, Option, ReadonlyArray, pipe } from "effect";
import { RequestError, RequestService } from "../../lib/api/request";
import { provideRequestService } from "../../lib/api/requestServiceImpl";
import { fetchToken } from "../../lib/token/fetchToken";
import { match } from "@yaltt/model";
import { Collapse } from "react-daisyui";
import { useRemoteState } from "../../lib/remote/useRemoteState";
import { Launch } from "./Launch";
import {
  extractAgsEndpointClaim,
  extractContentItemsClaim,
  extractNamesRolesServiceClaim,
} from "lti-model";
import { LaunchCollapsible } from "./LaunchCollapsible";

export type TokenFetcherProps = {
  launch: Launch;
};

export const TokenFetcher = (props: TokenFetcherProps) => {
  const { launch } = props;

  const token = useRemoteState(fetchToken);

  return (
    <LaunchCollapsible title="API Tokens">
      <div className="flex flex-col">
        <button
          className="btn btn-neutral flex-1"
          disabled={token.data.tag === "loading"}
          onClick={() => token.fetch(launch.appId, launch.registration_id)}
        >
          {token.data.tag === "loading" ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : null}
          Fetch API Token
        </button>

        {pipe(
          token.data,
          match({
            initial: () => <></>,
            loading: () => <></>,
            error: (e) => (
              <div>
                <h6 className="mt-2">Error:</h6>
                <pre>{JSON.stringify(e.error, null, 2)}</pre>
              </div>
            ),
            loaded: (t) => {
              return (
                <div className="prose">
                  <div>
                    <h6 className="mt-2">Token</h6>
                    <pre
                      className="my-1 break-all text-pretty"
                      style={{ textWrap: "wrap" } as {}}
                    >
                      {t.value.access_token}
                    </pre>
                  </div>
                  {pipe(
                    [
                      pipe(
                        launch.id_token,
                        extractNamesRolesServiceClaim,
                        Option.map((a) => a.context_memberships_url),
                        Option.map(
                          renderServiceRequest(
                            "Names and Roles",
                            t.value.access_token
                          )
                        )
                      ),
                      pipe(
                        launch.id_token,
                        extractAgsEndpointClaim,
                        Option.flatMapNullable((a) => a.lineitem),
                        Option.map(
                          renderServiceRequest(
                            "AGS Line Item",
                            t.value.access_token
                          )
                        )
                      ),
                      pipe(
                        launch.id_token,
                        extractAgsEndpointClaim,
                        Option.flatMapNullable((a) => a.lineitems),
                        Option.map(
                          renderServiceRequest(
                            "AGS Line Items",
                            t.value.access_token
                          )
                        )
                      ),
                    ],
                    ReadonlyArray.filterMap((a) => a),
                    ReadonlyArray.match({
                      onEmpty: () => (
                        <>
                          Token:{" "}
                          <pre className="whitespace-normal break-all">
                            {t.value.access_token}
                          </pre>
                        </>
                      ),
                      onNonEmpty: (a) => a,
                    })
                  )}
                </div>
              );
            },
          })
        )}
      </div>
    </LaunchCollapsible>
  );
};

const renderServiceRequest = (name: string, token: string) => (url: string) => {
  return (
    <div>
      <h6 className="mt-2">{name}</h6>
      <pre className="my-1">{`curl \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer ${token}' \\
  ${url}`}</pre>
    </div>
  );
};
