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
    path: "/apps/:appId/dynamic-registration",
    element: <DynamicRegistration />,
  },
]);

const el = document.getElementById("main");
if (el) {
  createRoot(el).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
