import { Effect, pipe } from "effect";
import * as express from "express";

import { authedRequest, unauthorizedError } from "../auth/authedRequestHandler";
import {
  addUserWithLocalPassword,
  getAllUsers,
  getUserWithLoginById,
} from "../model/users";
import { bindEndpoint } from "../express/endpointRequestHandler";
import { createPasswordUser, getUsers } from "@yaltt/model";

export const adminRouter = express.Router();

export const userIsAdmin = pipe(
  Effect.succeed({}),
  Effect.bind("user", () => authedRequest),
  Effect.filterOrFail(
    ({ user }) => user.role === "admin",
    () => unauthorizedError(`This app doesn't belong to you.`)
  ),
  Effect.map(({ user }) => user)
);

const bindAdminEndpoint = bindEndpoint(adminRouter);

bindAdminEndpoint(getUsers)(() =>
  pipe(userIsAdmin, Effect.flatMap(getAllUsers))
);

bindAdminEndpoint(createPasswordUser)((_u, _q, body) =>
  pipe(
    userIsAdmin,
    Effect.flatMap(() => addUserWithLocalPassword(body.username, body.password))
  )
);
