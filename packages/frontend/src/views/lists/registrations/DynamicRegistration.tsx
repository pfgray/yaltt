import * as React from "react";
import { useParsedQuery } from "../../../lib/react-router/useParsedQuery";
import { useParsedParams } from "../../../lib/react-router/useSchemaParams";
import * as S from "@effect/schema/Schema";
import { WithAuth } from "../../../lib/auth/WithAuth";
import { WithRequest } from "../../../lib/api/WithRequest";
import { getDecode, jsonBody, post } from "../../../lib/api/request";
import { Effect, Either, pipe } from "effect";
import { PlatformConfiguration } from "lti-schema";
import { formatErrors } from "@effect/schema/TreeFormatter";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { provideRequestService } from "../../../lib/api/requestServiceImpl";

const fetchOpenIdConfig = (params: {
  openid_configuration: string;
  registration_token?: string;
}) =>
  getDecode(S.unknown)(
    `/api/retrieve_openid_configuration?url=${params.openid_configuration}` +
      (params.registration_token
        ? `&registration_token=${params.registration_token}`
        : "")
  );

const installTool = (
  appId: string,
  config: {
    platformConfiguration: PlatformConfiguration;
    registrationToken?: string;
    registrationEndpoint: string;
    messages: Array<{
      type: string;
      placements: Array<string>;
    }>;
  }
) => post(`/api/apps/${appId}/install`, jsonBody(config));

export const DynamicRegistration = () => {
  const params = useParsedParams(
    S.struct({
      appId: S.string,
    })
  );
  const query = useParsedQuery(
    S.struct({
      openid_configuration: S.string,
      registration_token: S.optional(S.string),
    })
  );

  return (
    <WithAuth>
      {(user) =>
        pipe(
          params,
          Either.flatMap((params) =>
            pipe(
              query,
              Either.mapRight((query) => ({ params, query }))
            )
          ),
          Either.match({
            onRight: ({ params, query }) => (
              <WithRequest eff={fetchOpenIdConfig(query)}>
                {(config) =>
                  pipe(
                    S.parseEither(PlatformConfiguration)(config, {
                      onExcessProperty: "ignore",
                    }),
                    Either.match({
                      onLeft: (errors) => (
                        <div className="flex flex-col items-center w-full">
                          <article className="prose">
                            <pre>{formatErrors(errors.errors)}</pre>
                            <h3>raw</h3>
                            <pre>{JSON.stringify(config, null, 2)}</pre>
                          </article>
                        </div>
                      ),
                      onRight: (platformConfiguration) => (
                        <div className="flex flex-col items-center w-full">
                          <article className="prose mt-5">
                            {/* <pre>{JSON.stringify({ params, query }, null, 2)}</pre> */}
                            <h1 className="text-center">
                              Installing Yaltt into "
                              {
                                (config as any)[
                                  "https://purl.imsglobal.org/spec/lti-platform-configuration"
                                ][
                                  "https://canvas.instructure.com/lti/account_name"
                                ]
                              }
                              "
                            </h1>

                            <ServicesSupported
                              platformConfiguration={platformConfiguration}
                            />
                            <MessageTypes
                              platformConfiguration={platformConfiguration}
                            />

                            <div className="w-full flex justify-end flex-row">
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  pipe(
                                    installTool(params.appId, {
                                      platformConfiguration:
                                        platformConfiguration,
                                      registrationToken:
                                        query.registration_token,
                                      registrationEndpoint:
                                        platformConfiguration.registration_endpoint,
                                      messages: [
                                        {
                                          type: "LtiResourceLinkRequest",
                                          placements: [
                                            "editor_button",
                                            "resource_selection",
                                          ],
                                        },
                                      ],
                                    }),
                                    provideRequestService,
                                    Effect.runCallback
                                  );
                                }}
                              >
                                Install
                              </button>
                            </div>
                            <div className="divider"></div>

                            <h3>Raw Platform Configuration</h3>

                            <pre>{JSON.stringify(config, null, 2)}</pre>
                          </article>
                        </div>
                      ),
                    })
                  )
                }
              </WithRequest>
            ),
            onLeft: (err) => (
              <div>
                error
                <pre>{formatErrors(err.errors)}</pre>{" "}
              </div>
            ),
          })
        )
      }
    </WithAuth>
  );
};

const ServicesSupported = (props: {
  platformConfiguration: PlatformConfiguration;
}) => {
  return (
    <div>
      <h3>Services Supported by this Platform</h3>
      <ul className="list-none pl-0">
        {PossibleScopes.map((ps) => ({
          ...ps,
          supported:
            typeof props.platformConfiguration.scopes_supported.find(
              (scope) => {
                return scope === ps.type;
              }
            ) !== "undefined",
        })).map((ps) => (
          <li key={ps.type}>
            <label
              className={
                "flex flex-row items-center" +
                (ps.supported ? " text-success" : "")
              }
            >
              <CheckCircleIcon className={"h-5"} />
              <span className="ml-2">{ps.description}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PossibleScopes = [
  {
    type: "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem",
    description: "Manage Gradebook Columns",
  },
  {
    type: "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem.readonly",
    description: "Read Gradebook Columns",
  },
  {
    type: "https://purl.imsglobal.org/spec/lti-ags/scope/result.readonly",
    description: "Read Student Submissions",
  },
  {
    type: "https://purl.imsglobal.org/spec/lti-ags/scope/score",
    description: "Create Student Submissions",
  },
  {
    type: "https://purl.imsglobal.org/spec/lti-nrps/scope/contextmembership.readonly",
    description: "Read Course Membership",
  },
  {
    type: "https://canvas.instructure.com/lti/public_jwk/scope/update",
    description: "Update Public JWK",
  },
  {
    type: "https://canvas.instructure.com/lti/account_lookup/scope/show",
    description: "Lookup Accounts",
  },
  {
    type: "https://canvas.instructure.com/lti-ags/progress/scope/show",
    description: "Read Student Progress",
  },
];

const MessageTypes = (props: {
  platformConfiguration: PlatformConfiguration;
}) => {
  return (
    <div>
      <h3>Configure Messages</h3>

      {props.platformConfiguration[
        "https://purl.imsglobal.org/spec/lti-platform-configuration"
      ].messages_supported
        .filter((message) => (message.placements?.length || 0) > 0)
        .map((message) => (
          <div className="collapse collapse-arrow bg-base-200 mb-5">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              {message.type}
            </div>
            <div className="collapse-content">
              <ul className="list-none pl-0">
                {(message.placements || []).map((p) => (
                  <li className="">
                    <label className=" flex flex-row items-center cursor-pointer">
                      <input type="checkbox" className="checkbox" />
                      <span className="ml-2">{p}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

      {/* <ul className="list-none pl-0">
        {props.platformConfiguration[
          "https://purl.imsglobal.org/spec/lti-platform-configuration"
        ].messages_supported
          .filter((message) => (message.placements?.length || 0) > 0)
          .map((message) => (
            <li>
              <h5>{message.type}</h5>
              <ul className="list-none pl-0">
                {(message.placements || []).map((p) => (
                  <li className="">
                    <label className=" flex flex-row items-center cursor-pointer">
                      <input type="checkbox" className="checkbox" />
                      <span className="ml-1">{p}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul> */}
    </div>
  );
};

const PossibleMessageTypes = [
  {
    type: "LtiResourceLinkRequest",
  },
  {
    type: "LtiDeepLinkingRequest",
  },
];
