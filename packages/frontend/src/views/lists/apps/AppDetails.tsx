import * as S from "@effect/schema/Schema";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import {
  App,
  AppId,
  CanvasPlatformConfiguration,
  Registration,
  getApp,
  stringToInteger,
  AppWithRegistrations,
} from "@yaltt/model";
import { Effect, Either, Option, pipe } from "effect";
import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { YalttLayout } from "../../../YalttLayout";
import { WithRequest } from "../../../lib/api/WithRequest";
import {
  RequestError,
  delete_,
  getDecode,
  jsonBody,
  post,
} from "../../../lib/api/request";
import { provideRequestService } from "../../../lib/api/requestServiceImpl";
import { confirmWithLoading } from "../../../lib/confirmation/Confirm";
import * as F from "../../../lib/forms/form";
import { useParsedParams } from "../../../lib/react-router/useSchemaParams";
import { NewEntityForm } from "../NewEntityForm";
import { FetchError } from "../../../lib/endpoint-ts/fetchFromEndpoint";
import { fetchApp } from "../../../lib/apps/apps";
import { Pre } from "../../../lib/ui/Pre";

const paramSchema = S.struct({ appId: S.compose(S.NumberFromString, AppId) });

const deleteRegistration = (options: {
  appId: number;
  registrationId: number;
}) =>
  delete_(`/api/apps/${options.appId}/registrations/${options.registrationId}`);

export const AppDetails = () => {
  const params = useParsedParams(paramSchema);

  const manualDialogRef = React.useRef<HTMLDialogElement>(null);
  const dynamicRegDialogRef = React.useRef<HTMLDialogElement>(null);

  return pipe(
    params,
    Either.match({
      onLeft: (err) => (
        <div>
          Error parsing app id from params{" "}
          <Pre>{JSON.stringify(err, null, 2)}</Pre>
        </div>
      ),
      onRight: ({ appId }) => (
        <>
          <WithRequest eff={fetchApp({ appId })}>
            {(app, reloadApps) => (
              <YalttLayout
                header={
                  <div className="text-sm breadcrumbs">
                    <ul>
                      <li>
                        <Link className="link" to={`/`}>
                          Apps
                        </Link>
                      </li>
                      <li>{app.name}</li>
                    </ul>
                  </div>
                }
              >
                <div className="flex flex-col w-full">
                  {app.registrations.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center">
                      <EmptyRegistrationsView
                        app={app}
                        manualDialogRef={manualDialogRef}
                        dynamicRegDialogRef={dynamicRegDialogRef}
                        reloadApps={reloadApps}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-1 pt-20 justify-center">
                      <RegistrationsList
                        app={app}
                        manualDialogRef={manualDialogRef}
                        dynamicRegDialogRef={dynamicRegDialogRef}
                        reloadApps={reloadApps}
                      />
                    </div>
                  )}
                </div>
              </YalttLayout>
            )}
          </WithRequest>

          <dialog ref={manualDialogRef} className="modal">
            <div className="modal-box w-11/12 max-w-3xl">
              <NewEntityForm
                close={() => {
                  manualDialogRef.current?.close();
                }}
                form={newRegistrationForm(appId)}
                entityName={"Registration"}
              />
            </div>
          </dialog>

          <dialog ref={dynamicRegDialogRef} className="modal">
            <div className="modal-box text-center w-11/12 max-w-3xl">
              <article className="prose">
                <h2 className="flex-none mb-2">Dynamic registration url</h2>
                <p className="flex-none mb-2">
                  Copy this url to paste into an LTI Platform
                </p>
              </article>
              <div className="w-auto overflow-x-auto">
                <div className="mockup-code before:content-none">
                  <Pre>{url(`/apps/${appId}/dynamic-registration`)}</Pre>
                </div>
              </div>
              <div className="modal-action">
                <button
                  className="btn"
                  onClick={() => {
                    dynamicRegDialogRef.current?.close();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        </>
      ),
    })
  );
};

const newRegistrationForm = (appId: number) =>
  F.mkForm({
    platformConfiguration: F.json(
      "Platform Configuration",
      JSON.stringify(CanvasPlatformConfiguration, null, 2)
    ),
  })((fields) =>
    pipe(
      provideRequestService(
        post(`/api/apps/${appId}/registrations`, jsonBody(fields))
      )
    )
  );

const url = (path: string) => {
  const host = window.location.hostname;
  const port = window.location.port === "" ? "" : `:${window.location.port}`;
  const scheme = window.location.protocol;
  return `${scheme}//${host}${port}${path}`;
};

type SubViewProps = {
  app: AppWithRegistrations;
  dynamicRegDialogRef: React.RefObject<HTMLDialogElement>;
  manualDialogRef: React.RefObject<HTMLDialogElement>;
  reloadApps: Effect.Effect<
    AppWithRegistrations,
    RequestError | FetchError,
    never
  >;
};

const EmptyRegistrationsView = (props: SubViewProps) => {
  return (
    <div className="w-full">
      <div className="hero bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Create Registration</h1>
            <p className="py-6">
              Each app can have many "registrations." A registration is a
              connection point to an LTI Platform. You can connect one LTI
              Platform per registration.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex w-full h-36 justify-around place-items-center">
        <div className="flex-1 flex justify-end">
          <button
            className="btn btn-primary w-64"
            onClick={() => {
              props.dynamicRegDialogRef.current?.showModal();
            }}
          >
            Dynamic Registration
          </button>
        </div>
        <div className="flex-0 divider divider-horizontal">OR</div>
        <div className="flex-1 flex justify-start">
          <button
            className="btn btn-primary w-64"
            onClick={() => {
              props.manualDialogRef.current?.showModal();
            }}
          >
            Create Manual
          </button>
        </div>
      </div>
    </div>
  );
};

const RegistrationsList = (props: SubViewProps) => {
  return (
    <div className="">
      <div className="flex-1 flex w-full p-1 justify-end place-items-center">
        <div className="flex-1 flex justify-start prose">
          <h1>Integrations</h1>
        </div>
        <div className="flex justify-end">
          <button
            className="btn btn-primary w-64 btn-sm"
            onClick={() => {
              props.dynamicRegDialogRef.current?.showModal();
            }}
          >
            Dynamic Registration
          </button>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="flex justify-start">
          <button
            className="btn btn-primary w-64 btn-sm"
            onClick={() => {
              props.manualDialogRef.current?.showModal();
            }}
          >
            Create Manual
          </button>
        </div>
      </div>
      <div className="divider"></div>
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Issuer</th>
            <th>Last Launched</th>
            {/* <th className="text-center">Launches</th>
            <th className="text-center">Contexts</th>
            <th className="text-center">Users</th> */}
            <th>Saved Config</th>
            <th>Client Id</th>
            <th>Type</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {props.app.registrations.map((r) => (
            <tr key={r.id}>
              <td>
                <a className="link" href={r.platform_configuration.issuer}>
                  {r.platform_configuration.issuer}
                </a>
              </td>
              <td>{format(r.created)}</td>
              {/* <td className="text-center">{0}</td>
              <td className="text-center">{0}</td>
              <td className="text-center">{0}</td> */}
              <td>
                <a
                  href={`/api/apps/${r.app_id}/registrations/${r.id}/saved-configuration`}
                  className="link"
                >
                  view
                </a>
              </td>
              <td>{Option.getOrNull(r.client_id)}</td>
              <td>{r.type}</td>
              <td>{format(r.created)}</td>
              <td>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="">
                    <button>
                      <EllipsisVerticalIcon className="w-5" />
                    </button>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52"
                  >
                    <li>
                      <a
                        onClick={() => {
                          pipe(
                            confirmWithLoading({
                              title: "Delete Registration?",
                              description:
                                "Are you sure you want to delete this registration?",
                              onSubmit: () =>
                                pipe(
                                  deleteRegistration({
                                    appId: props.app.id,
                                    registrationId: r.id,
                                  }),
                                  Effect.flatMap(() => props.reloadApps),
                                  provideRequestService
                                ),
                            }),
                            provideRequestService,
                            Effect.runCallback
                          );
                        }}
                      >
                        Delete
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/api/apps/${props.app.id}/registrations/${r.id}/token`}
                      >
                        Token
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/api/registrations/${r.id}/canvas_configuration`}
                      >
                        Config JSON
                      </a>
                    </li>

                    {pipe(
                      r.registration_config_url,
                      Option.match({
                        onNone: () => <></>,
                        onSome: (url) => (
                          <li>
                            <a href={url}>Platform Config</a>
                          </li>
                        ),
                      })
                    )}
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
