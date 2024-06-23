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
  getUserWithLoginById,
} from "../../model/users";

import { Effect, pipe } from "effect";
import { QueryService } from "../../db/QueryService";
import { mkTransactionalPgService } from "../../db/TransactionalPgService";
import { pool } from "../../db/db";
import { login } from "../auth";
import { unauthenticatedError } from "../authedRequestHandler";
import { passwordUser } from "@yaltt/model";

type NoUserFound = {
  _tag: "no_user_found";
  username: string;
};

const noUserFound = (username: string): NoUserFound => ({
  _tag: "no_user_found",
  username,
});

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
      Effect.catchTag("no_record_found", (err) =>
        Effect.fail(noUserFound(username))
      ),
      (a) => a,
      Effect.bindTo("login"),
      Effect.tap(({ login }) =>
        validatePassword(password, login.salt, login.hashed_password)
      ),
      Effect.bind("user", ({ login }) => getUserWithLoginById(login.id)),
      pgService.provide
    );

    Effect.runPromiseExit(eff).then((status) => {
      if (status._tag === "Failure") {
        if (
          status.cause._tag === "Fail" &&
          (status.cause.error._tag === "no_user_found" ||
            status.cause.error._tag === "invalid_password")
        ) {
          console.log("Failed to login user ", username, status.cause.error);
          cb(null, false);
        } else {
          console.log("Failed to login user ", username, status.cause);
          cb(status.cause);
        }
      } else {
        cb(null, status.value.user);
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
