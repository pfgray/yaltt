import { pipe, Effect, Option, Either, Exit } from "effect";
import * as express from "express";
import * as passportBase from "passport";

import { User as ModelUser, User } from "@yaltt/model";
import { ExpressRequestService } from "../express/RequestService";
import { tap } from "../util/tap";
import { getAppsForUser } from "../model/entities/apps";
import { getPasswordLoginUserById } from "../model/users";
import { PgService } from "../db/PgService";
import { DecodeError, NoRecordFound, PgError, pool } from "../db/db";
import { mkTransactionalPgService } from "../db/TransactionalPgService";
const passport = (passportBase as any).default as typeof passportBase;

declare global {
  namespace Express {
    interface User extends ModelUser {}
  }
}

/* Configure session management.
 *
 * When a login session is established, information about the user will be
 * stored in the session.  This information is supplied by the `serializeUser`
 * function, which is yielding the user ID and username.
 *
 * As the user interacts with the app, subsequent requests will be authenticated
 * by verifying the session.  The same user information that was serialized at
 * session establishment will be restored when the session is authenticated by
 * the `deserializeUser` function.
 *
 * Since every request to the app needs the user ID and username, in order to
 * fetch todo records and render the user element in the navigation bar, that
 * information is stored in the session.
 */
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    console.log("serializing user: ", user);
    cb(null, user.id);
  });
});

passport.deserializeUser<number>(function (id, cb) {
  console.log("deserializing user (before)...", id);
  process.nextTick(function () {
    const pgService = mkTransactionalPgService(pool);
    console.log("deserializing user: ", id);
    Effect.runCallback(
      pipe(
        getPasswordLoginUserById(id),
        Effect.provideService(PgService, pgService.service)
      ),
      Exit.match({
        onFailure: (cause) => {
          console.error("Couldn't deserialize user: ", cause);
          cb(cause);
        },
        onSuccess: (user) => {
          console.log("deserialized user: ", user.login);
          cb(null, user);
        },
      })
    );
  });
});

export const requireAuth = (
  req: express.Request,
  resp: express.Response,
  next: express.NextFunction
) => {
  console.log("request user: ", req.user);
  if (!req.user) {
    console.log(`Blocked access to ${req.url} for unauthenticated user.`);
    resp.status(401);
    resp.json({ failure: "unauthenticated" });
  } else {
    next();
  }
};

interface LoginError {
  tag: "login_error";
  cause: unknown;
}
export const login = (user: User) =>
  ExpressRequestService.pipe(
    tap(() => "logging in"),
    Effect.flatMap(({ request }) =>
      Effect.async<never, LoginError, {}>((resume) => {
        request.login(user, function (err) {
          if (err) {
            resume(Effect.fail({ tag: "login_error", cause: err }));
          } else {
            resume(Effect.succeed({}));
          }
        });
      })
    )
  );
