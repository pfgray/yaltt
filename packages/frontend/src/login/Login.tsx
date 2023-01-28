import * as React from "react";
import * as E from "@fp-ts/data/Either";
import * as Eff from "@effect/io/Effect";
import * as F from "../forms/form";
import { pipe } from "@fp-ts/data/Function";
import { post } from "../api/request";
import { RequestService } from "../api/request";
import { renderForm } from "../forms/renderForm";

declare const API_URL: string;

const loginForm = F.mkForm({
  username: F.string("Username"),
  password: F.password("Password"),
})((fields) => {
  Eff.unsafeRun(
    pipe(
      post("/login/password", fields),
      Eff.provideService(RequestService, {
        config: { baseUrl: API_URL },
      })
    ),
    (exit) => {
      console.log("done with req:", exit);
    }
  );
});

//   formValidation: (fields) => {
//     return E.right(fields);
//   },
//   onsubmit: () => {},
// };
export const Login = () => {
  return (
    <div>
      Login!
      {renderForm(loginForm)}
    </div>
  );
};
