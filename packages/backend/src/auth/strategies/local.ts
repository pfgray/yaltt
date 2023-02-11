import { pipe } from "@fp-ts/core/Function";
import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import { validatePassword } from "../../crypto/hash";
import {
  effRequestHandler,
  succcessResponse,
} from "../../express/effRequestHandler";
import { parseBody } from "../../express/parseBody";
import {
  getLoginByUsername,
  addUserWithLocalPassword,
} from "../../model/users";
import * as S from "@fp-ts/schema";
import * as P from "@fp-ts/schema/Parser";
import * as C from "@fp-ts/data/Context";

import * as Eff from "@effect/io/Effect";
import { login } from "../auth";
import {
  unauthenticatedError,
  UnauthenticatedError,
} from "../authedRequestHandler";
import { mkTransactionalPgService } from "../../db/TransactionalPgService";
import { pool } from "../../db/db";
import { PgService } from "../../db/PgService";

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
      Eff.tap((user) =>
        validatePassword(password, user.salt, user.hashed_password)
      ),
      Eff.provideService(PgService, pgService.service)
    );

    Eff.runCallback(eff, (status) => {
      if (status._tag === "Failure") {
        console.log("Failed to login user ", username, status.cause);
        cb(status.cause);
      } else {
        cb(null, {
          id: status.value.id,
          login: { tag: "password_login", username },
        });
      }
    });
  })
);

export const signupPasswordRoute = effRequestHandler(
  pipe(
    parseBody(S.struct({ username: S.string, password: S.string })),
    Eff.flatMap(({ username, password }) =>
      addUserWithLocalPassword(username, password)
    ),
    Eff.flatMap(login),
    Eff.mapError(unauthenticatedError),
    Eff.map(succcessResponse)
  )
);
