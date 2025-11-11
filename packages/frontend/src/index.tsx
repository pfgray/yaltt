import { createRoot } from "react-dom/client";
import "./index.css";
import { YalttRouterLayout } from "./YalttLayout";

import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { Admin } from "./views/admin/Admin";
import { LaunchView } from "./views/launch/LaunchView";
import { Account } from "./views/lists/account/Account";
import { AppDetails } from "./views/lists/apps/AppDetails";
import { Apps } from "./views/lists/apps/Apps";
import { Contexts } from "./views/lists/contexts/Contexts";
import { Launches } from "./views/lists/launches/Launches";
import { RegistrationLogin } from "./views/lists/launches/RegistrationLogin";
import { DynamicRegistration } from "./views/lists/registrations/DynamicRegistration";
import { DynamicRegistrationAppPicker } from "./views/lists/registrations/DynamicRegistrationAppPicker";
import { Registrations } from "./views/lists/registrations/Registrations";
import { Users } from "./views/lists/users/Users";
import SignIn from "./views/login/SignIn";
import { NewManualRegistration } from "./views/registration/NewManualRegistration";
import { DynamicRegistrationSimple } from "./views/lists/registrations/DynamicRegistrationSimple";
import { DynamicRegistrationCustom } from "./views/lists/registrations/DynamicRegistrationCustom";
import { RegistrationEdit } from "./views/launch/RegistrationEdit";

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
    path: "/apps/:appId/registrations/:registrationId/configuration",
    element: <RegistrationEdit />,
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
    path: "/dynamic-registration/custom",
    element: <DynamicRegistrationCustom />,
  },
  {
    path: "/apps/:appId/dynamic-registration",
    element: <DynamicRegistration />,
  },
  {
    path: "/apps/:appId/dynamic-registration-simple",
    element: <DynamicRegistrationSimple />,
  },
]);

console.log("hmm");

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
