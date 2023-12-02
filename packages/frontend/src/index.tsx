import * as React from "react";
import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import { YalttRouterLayout } from "./YalttLayout";
import "./index.css";

import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { Apps } from "./views/lists/apps/Apps";
import { Users } from "./views/lists/users/Users";
import { Contexts } from "./views/lists/contexts/Contexts";
import { Launches } from "./views/lists/launches/Launches";
import { Account } from "./views/lists/account/Account";
import SignIn from "./views/login/SignIn";
import { Registrations } from "./views/lists/registrations/Registrations";
import { AppDetails } from "./views/lists/apps/AppDetails";
import { DynamicRegistration } from "./views/lists/registrations/DynamicRegistration";
import { NewManualRegistration } from "./views/registration/NewManualRegistration";
import { DynamicRegistrationAppPicker } from "./views/lists/registrations/DynamicRegistrationAppPicker";
import { RegistrationLogin } from "./views/lists/launches/RegistrationLogin";
import { LaunchView } from "./views/launch/LaunchView";
import { Admin } from "./views/admin/Admin";

const mkPath = (
  path: string,
  element: JSX.Element,
  children?: RouteObject[]
) => ({
  path,
  element,
  children,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Apps />,
  },
  {
    path: "/apps/:appId",
    element: <AppDetails />,
  },
  {
    path: "/apps/:appId/new-registration",
    element: <NewManualRegistration />,
  },
  {
    path: "/registrations/:registrationId/login",
    element: <RegistrationLogin />,
  },
  {
    path: "/launch/:launchId",
    element: <LaunchView />,
  },
  {
    path: "/",
    element: <YalttRouterLayout />,
    children: [
      mkPath("apps/:appId/registrations", <Registrations />),
      mkPath("users", <Users />),
      mkPath("contexts", <Contexts />),
      mkPath("launches", <Launches />),
      mkPath("account", <Account />),
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignIn />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/dynamic-registration",
    element: <DynamicRegistrationAppPicker />,
  },
  {
    path: "/apps/:appId/dynamic-registration",
    element: <DynamicRegistration />,
  },
]);

const el = document.getElementById("main");
if (el) {
  createRoot(el).render(
    <>
      <dialog id="confirmation_modal" className="modal">
        <div className="modal-box">
          <h3 id="confirmation_modal_title" className="font-bold text-lg"></h3>
          <p id="confirmation_modal_description" className="py-4"></p>
          <div className="modal-action">
            <button id="confirmation_modal_cancel" className="btn">
              Cancel
            </button>
            <button id="confirmation_modal_confirm" className="btn">
              Confirm
            </button>
          </div>
        </div>
      </dialog>
      <RouterProvider router={router} />
    </>
  );
}
