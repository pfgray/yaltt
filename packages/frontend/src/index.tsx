import { Button } from "@mui/material";
import * as React from "react";
import { render } from "react-dom";
import { App } from "./App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Vendors } from "./vendors/Vendors";
import { Users } from "./users/Users";
import { Contexts } from "./contexts/Contexts";
import { Launches } from "./launches/Launches";
import { Account } from "./account/Apps";
import { Apps } from "./apps/Apps";
import { Login } from "./login/Login";
import SignIn from "./login/SignIn";

const mkPath = (path: string, element: JSX.Element) => ({
  path,
  element,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      mkPath("vendors", <Vendors />),
      mkPath("users", <Users />),
      mkPath("apps", <Apps />),
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
]);

const el = document.getElementById("main");
if (el) {
  render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
    el
  );
}
