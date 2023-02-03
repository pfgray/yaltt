import { Button, createTheme, ThemeProvider } from "@mui/material";
import * as React from "react";
import { render } from "react-dom";
import { App } from "./App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Apps } from "./views/lists/apps/Apps";
import { Users } from "./views/lists/users/Users";
import { Contexts } from "./views/lists/contexts/Contexts";
import { Launches } from "./views/lists/launches/Launches";
import { Account } from "./views/lists/account/Apps";
import { Login } from "./views/login/Login";
import SignIn from "./views/login/SignIn";
import { green, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009973", // "#00bcd4",
    },
  },
});

const mkPath = (path: string, element: JSX.Element) => ({
  path,
  element,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      mkPath("apps", <Apps />),
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
]);

const el = document.getElementById("main");
if (el) {
  render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>,
    el
  );
}
