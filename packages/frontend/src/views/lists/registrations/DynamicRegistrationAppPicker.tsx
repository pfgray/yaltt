import * as React from "react";
import { useParsedQuery } from "../../../lib/react-router/useParsedQuery";
import * as S from "@effect/schema/Schema";
import { WithAuth } from "../../../lib/auth/WithAuth";
import { WithRequest } from "../../../lib/api/WithRequest";
import { Effect, Either, pipe } from "effect";
import { formatError } from "@effect/schema/TreeFormatter";
import { newAppForm } from "../apps/Apps";
import { getGradientForString } from "../../../lib/ui/gradients";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { NewEntityForm } from "../NewEntityForm";
import { fetchApps } from "../../../lib/apps/apps";

export const DynamicRegistrationAppPicker = () => {
  const query = useParsedQuery(
    S.struct({
      openid_configuration: S.string,
      registration_token: S.optional(S.string),
    })
  );

  const dialogRef = React.useRef<HTMLDialogElement>(null);

  return (
    <WithAuth>
      {(user) =>
        pipe(
          query,
          Either.match({
            onRight: (query) => (
              <WithRequest eff={fetchApps({})}>
                {(apps, reloadApps) => (
                  <div className="container my-12 mx-auto px-4 md:px-12">
                    <dialog ref={dialogRef} className="modal">
                      <div className="modal-box">
                        <NewEntityForm
                          close={() => {
                            dialogRef.current?.close();
                          }}
                          form={newAppForm}
                          entityName={"App"}
                          afterSubmit={reloadApps}
                        />
                      </div>
                    </dialog>
                    <div className="container px-4 flex flex-wrap -mx-1 lg:-mx-4">
                      {apps.map((app) => {
                        const appGradient = getGradientForString(app.name);
                        return (
                          <div
                            className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                            key={app.id}
                          >
                            <div className="card card-compact bg-base-300 shadow-xl m-1 h-64">
                              <figure
                                className={`py-2`}
                                style={{
                                  color: "rgb(31, 41, 55)",
                                  backgroundImage: appGradient,
                                }}
                              >
                                <span className={`text-2xl`}>{app.name}</span>
                              </figure>
                              <div className="card-body">
                                <div className="flex flex-row justify-between">
                                  <p className="flex-none">0 launches</p>
                                  <p className="flex-none">
                                    last launch: never
                                  </p>
                                </div>
                                <div className="flex flex-row justify-between">
                                  <p className="flex-none">0 people</p>
                                  <p className="flex-none">0 contexts</p>
                                </div>
                                <p>created: {format(app.created)}</p>

                                <div className="card-actions items-center">
                                  <Link
                                    className="link"
                                    to={
                                      `/apps/${app.id}/dynamic-registration?openid_configuration=${query.openid_configuration}` +
                                      (query.registration_token
                                        ? `&registration_token=${query.registration_token}`
                                        : "")
                                    }
                                  >
                                    Install
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <div className="card bg-base-200 h-64">
                          <div className="card-body items-center text-center">
                            <h2 className="card-title">New App</h2>
                            <p>Add a new App</p>
                            <div className="card-actions justify-end">
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  dialogRef.current?.showModal();
                                }}
                              >
                                Create App
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </WithRequest>
            ),
            onLeft: (err) => {
              return (
                <div>
                  error
                  <pre>{formatError(err)}</pre>{" "}
                </div>
              );
            },
          })
        )
      }
    </WithAuth>
  );
};
