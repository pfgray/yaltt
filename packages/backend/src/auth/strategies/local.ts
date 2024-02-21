import * as S from "@effect/schema/Schema";
import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import { validatePassword } from "../../crypto/hash";
import {
  effRequestHandler,
  successResponse,
} from "../../express/effRequestHandler";
import { parseBody } from "../../express/parseBody";
import {
  addUserWithLocalPassword,
  getLoginByUsername,
  getUserById,
} from "../../model/users";

import { Effect, pipe } from "effect";
import { QueryService } from "../../db/QueryService";
import { mkTransactionalPgService } from "../../db/TransactionalPgService";
import { pool } from "../../db/db";
import { login } from "../auth";
import { unauthenticatedError } from "../authedRequestHandler";

/* Configure password authentication strategy.
 *
 * The `LocalStrategy` authenticates users by verifying a username and password.
 * The strategy parses the username and password from the request and calls the
 * `verify` function.
 *
 * The `verify` function queries the database for the user record and verifies
 * the password by hashing the password supplied by the user and comparing it to
 * the hashed password stored in the database.  If the comparison succeeds, the
 * user is authenticated; otherwise, not.
 */
(passport as any).default.use(
  new LocalStrategy.Strategy(function verify(username, password, cb) {
    const pgService = mkTransactionalPgService(pool);
    const eff = pipe(
      getLoginByUsername(username),
      Effect.bindTo("login"),
      Effect.tap(({ login }) =>
        validatePassword(password, login.salt, login.hashed_password)
      ),
      Effect.bind("user", ({ login }) => getUserById(login.id)),
      pgService.provide
    );

    Effect.runPromiseExit(eff).then((status) => {
      if (status._tag === "Failure") {
        console.log("Failed to login user ", username, status.cause);
        cb(status.cause);
      } else {
        cb(null, {
          id: status.value.user.id,
          role: status.value.user.role,
          login: { _tag: "password_login", username },
        });
      }
    });
  })
);

export const signupPasswordRoute = effRequestHandler(
  pipe(
    parseBody(S.struct({ username: S.string, password: S.string })),
    Effect.flatMap(({ username, password }) =>
      addUserWithLocalPassword(username, password)
    ),
    Effect.flatMap(login),
    Effect.mapError(unauthenticatedError),
    Effect.map(successResponse)
  )
);
