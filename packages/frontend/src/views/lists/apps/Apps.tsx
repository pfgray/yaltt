import { pipe, Either, Option, ReadonlyArray, Effect } from "effect";
import * as S from "@effect/schema/Schema";
import { App } from "@yaltt/model";
import { getDecode, jsonBody, post } from "../../../lib/api/request";
import { provideRequestService } from "../../../lib/api/requestServiceImpl";
import * as F from "../../../lib/forms/form";
import { Link as RouterLink } from "react-router-dom";
import { WithRequest } from "../../../lib/api/WithRequest";
import { getColorForString } from "../../../lib/ui/colors";
import { getGradientForString } from "../../../lib/ui/gradients";
import { format, render, cancel, register } from "timeago.js";
import React from "react";
import { NewEntityForm } from "../List";
import { Link } from "react-router-dom";
import { YalttLayout } from "../../../YalttLayout";
import { TrashIcon } from "@heroicons/react/24/outline";

const newAppForm = F.mkForm({
  name: F.string("Name"),
})((fields) =>
  pipe(provideRequestService(post("/api/apps", jsonBody(fields))))
);

const fetchApps = getDecode(S.array(App))("/api/apps");

export const Apps = () => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const deleteDialogRef = React.useRef<HTMLDialogElement>(null);
  return (
    <>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <NewEntityForm
            close={() => {
              dialogRef.current?.close();
            }}
            form={newAppForm}
            entityName={"App"}
          />
        </div>
      </dialog>
      <dialog ref={deleteDialogRef} className="modal">
        <div className="modal-box text-center w-11/12 max-w-3xl">
          <article className="prose">
            <h2 className="flex-none mb-2">Delete App?</h2>
            <p className="flex-none mb-2">
              Are you sure you want to delete this app?
            </p>
          </article>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                deleteDialogRef.current?.close();
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-error"
              onClick={() => {
                deleteDialogRef.current?.close();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
      <YalttLayout
        header={
          <div className="text-sm breadcrumbs">
            <ul>
              <li>Apps</li>
            </ul>
          </div>
        }
      >
        <WithRequest eff={fetchApps}>
          {(apps) => {
            if (apps.length === 0) {
              return <EmptyAppsView newDialogRef={dialogRef} />;
            } else {
              return (
                <div className="container my-12 mx-auto px-4 md:px-12">
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
                                <p className="flex-none">last launch: never</p>
                              </div>
                              <div className="flex flex-row justify-between">
                                <p className="flex-none">0 people</p>
                                <p className="flex-none">0 contexts</p>
                              </div>
                              <p>created: {format(app.created)}</p>

                              <p></p>
                              <div className="card-actions items-center">
                                <button
                                  onClick={() => {
                                    deleteDialogRef.current?.showModal();
                                  }}
                                >
                                  <TrashIcon className="h-6 cursor" />
                                </button>
                                <Link className="link" to={`/apps/${app.id}`}>
                                  Details
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
              );
            }
          }}
        </WithRequest>
      </YalttLayout>
    </>
  );
};

type EmptyAppsViewProps = {
  newDialogRef: React.RefObject<HTMLDialogElement>;
};

const EmptyAppsView = (props: EmptyAppsViewProps) => {
  return (
    <div className="hero bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome</h1>
          <p className="py-6">
            "Apps" are installable into an LTI-compatible platform. Get started
            by creating an app.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              props.newDialogRef.current?.showModal();
            }}
          >
            Create App
          </button>
        </div>
      </div>
    </div>
  );
};
