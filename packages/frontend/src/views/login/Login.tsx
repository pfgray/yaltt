import * as React from "react";
import * as E from "@fp-ts/core/Either";
import * as Eff from "@effect/io/Effect";
import * as F from "../../lib/forms/form";
import { pipe } from "@fp-ts/core/Function";
import { post } from "../../lib/api/request";
import { RequestService } from "../../lib/api/request";
import { renderForm } from "../../lib/forms/renderForm";

declare const API_URL: string;

const loginForm = F.mkForm({
  username: F.string("Username"),
  password: F.password("Password"),
})((fields) => {
  Eff.runCallback(
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
