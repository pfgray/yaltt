import { useState } from "react";
import { Either, Option, pipe } from "effect";
import { useParsedParamsQuery } from "../../lib/react-router/useParsedParamsQuery";
import * as S from "@effect/schema/Schema";
import { WithRequest } from "../../lib/api/WithRequest";
import { getDecode } from "../../lib/api/request";
import { Button, Form, Textarea } from "react-daisyui";
import {
  AppId,
  getRegistration,
  Registration,
  RegistrationId,
} from "@yaltt/model";
import { fetchFromEndpoint } from "../../lib/endpoint-ts/fetchFromEndpoint";
import { Pre } from "../../lib/ui/Pre";

const fetchRegistration = fetchFromEndpoint(getRegistration);

export const RegistrationEdit = () => {
  const parsedParamsQuery = useParsedParamsQuery(
    S.struct({
      appId: S.compose(S.NumberFromString, AppId),
      registrationId: S.compose(S.NumberFromString, RegistrationId),
    }),
    S.struct({})
  );

  const [updatePayload, setUpdatePayload] = useState("");
  const [signedRequest, setSignedRequest] = useState<string | null>(null);

  const handleCreateSignedRequest = async (
    registration: Registration,
    payload: string
  ) => {
    try {
      // Parse the JSON payload first
      const parsedPayload = JSON.parse(payload);

      // Create a signed JWT for the update request
      const response = await fetch(
        `/api/apps/${registration.app_id}/registrations/${registration.id}/sign-update-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payload: parsedPayload,
            token: "", // Not needed for signing, just required by schema
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setSignedRequest(result.signedRequest);
      } else {
        console.error("Failed to create signed request");
      }
    } catch (error) {
      console.error("Error creating signed request:", error);
    }
  };

  return pipe(
    parsedParamsQuery,
    Either.match({
      onLeft: () => <div>Invalid params</div>,
      onRight: ({ params }) => (
        <WithRequest eff={fetchRegistration(params)}>
          {(registration) => (
            <div className="p-4 max-w-4xl mx-auto">
              <div className="flex flex-col gap-4">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">Send Signed Update Request</h2>
                    <p className="text-sm text-base-content/70">
                      Create a signed update request to the platform using a
                      token with the{" "}
                      <code className="bg-base-200 px-1 py-0.5 rounded">
                        https://purl.imsglobal.org/spec/lti-reg/scope/registration
                      </code>{" "}
                      scope.
                    </p>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">
                          Update Request Payload (JSON)
                        </span>
                      </label>
                      <Textarea
                        className="textarea textarea-bordered h-40"
                        placeholder={`{
  "tool_configuration": {
    "title": "Updated Tool Name",
    "description": "Updated description"
  }
}`}
                        value={updatePayload}
                        onChange={(e) => setUpdatePayload(e.target.value)}
                      />
                    </div>

                    <div className="card-actions justify-end">
                      <Button
                        color="primary"
                        disabled={!updatePayload.trim()}
                        onClick={() =>
                          handleCreateSignedRequest(registration, updatePayload)
                        }
                      >
                        Create Signed Request
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Signed Request Result */}
                {signedRequest && (
                  <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h3 className="card-title">Signed Update Request</h3>
                      <p className="text-sm text-base-content/70 mb-4">
                        Use this signed JWT to send your update request to the
                        platform.
                      </p>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Signed JWT</span>
                        </label>
                        <Pre>{signedRequest}</Pre>
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">
                            Example Platform Request
                          </span>
                        </label>
                        <Pre>{`curl -X PUT \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer ${signedRequest}' \\
  ${
    registration.platform_configuration.registration_endpoint ||
    "https://platform.example.com/registrations/{id}"
  } \\
  -d '${updatePayload}'`}</Pre>
                      </div>
                    </div>
                  </div>
                )}

                {/* Registration Info */}
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title">Registration Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Registration ID:</strong> {registration.id}
                      </div>
                      <div>
                        <strong>App ID:</strong> {registration.app_id}
                      </div>
                      <div>
                        <strong>Platform:</strong>{" "}
                        {registration.platform_configuration.issuer}
                      </div>
                      <div>
                        <strong>Client ID:</strong>{" "}
                        {pipe(
                          registration.client_id,
                          Option.getOrElse(() => "Not set")
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </WithRequest>
      ),
    })
  );
};
