import { pipe } from "effect";
import { basePath } from "./base";
import { Endpoint, Response, param, path } from "endpoint-ts";
import { LoginMechanisms } from "../auth/LoginMechanisms";
import { Launch, LaunchId } from "../registration/Launch";
import * as S from "@effect/schema/Schema";

export const getLaunch = Endpoint.get(
  pipe(
    basePath,
    path("launch"),
    param("launchId", S.compose(S.NumberFromString, LaunchId))
  ),
  {},
  Response.json(Launch)
);
