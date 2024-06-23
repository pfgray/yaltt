import { pipe } from "effect";
import { basePath } from "./base";
import { Endpoint, Response, path } from "endpoint-ts";
import { LoginMechanisms } from "../auth/LoginMechanisms";

export const authRoute = pipe(basePath);

export const getLoginMechanisms = Endpoint.get(
  pipe(authRoute, path("loginMechanisms")),
  {},
  Response.json(LoginMechanisms)
);
