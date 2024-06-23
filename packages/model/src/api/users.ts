import * as S from "@effect/schema/Schema";
import { pipe } from "effect";
import { Endpoint, Response, param, path } from "endpoint-ts";
import { YalttUser, YalttUserId } from "../user/User";
import { basePath } from "./base";

export const usersRoute = pipe(basePath, path("users"));
export const userRoute = pipe(
  usersRoute,
  param("userId", S.compose(S.NumberFromString, YalttUserId))
);

export const getUsers = Endpoint.get(
  usersRoute,
  {},
  Response.json(S.array(YalttUser))
);

export const getUser = Endpoint.get(usersRoute, {}, Response.json(YalttUser));
