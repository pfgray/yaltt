import { Effect, pipe } from "effect";
import * as express from "express";

import {
    effRequestHandler,
    successResponse,
} from "../express/effRequestHandler";

import {
    authedRequest,
    unauthorizedError,
} from "../auth/authedRequestHandler";
import { getAllUsers } from "../model/users";

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

adminRouter.get(
  "/users",
  effRequestHandler(
    pipe(
        userIsAdmin,
      Effect.flatMap(getAllUsers),
      Effect.map(successResponse)
    )
  )
);
