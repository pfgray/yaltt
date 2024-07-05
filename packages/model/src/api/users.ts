import * as S from "@effect/schema/Schema";
import { pipe } from "effect";
import { Body, Endpoint, Response, param, path } from "endpoint-ts";
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

export const createPasswordUser = Endpoint.post(
  usersRoute,
  {},
  Response.json(YalttUser),
  Body.json(S.struct({ username: S.string, password: S.string }))
);

export const getUser = Endpoint.get(usersRoute, {}, Response.json(YalttUser));
