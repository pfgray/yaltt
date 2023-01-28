import * as express from "express";
import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import { pool, query, query1 } from "../db/db";
import { hashPassword, validatePassword } from "../db/crypto";
import { pipe } from "@fp-ts/data/Function";
import * as Eff from "@effect/io/Effect";
import * as Exit from "@effect/io/Exit";
import * as S from "@fp-ts/schema/Schema";
import * as P from "@fp-ts/schema/Parser";
import * as C from "@fp-ts/data/Context";
import { buffer } from "../lib/BufferSchema";
import { addUserWithLocalPassword, getLoginByUsername } from "../model/users";

import * as crypto from "crypto";
import { effRequestHandler } from "../express/effRequestHandler";
import { parseBody } from "../express/parseBody";
import { ExpressRequestService } from "../express/RequestService";

declare global {
  namespace Express {
    interface User {
      id: number;
    }
  }
}

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
passport.use(
  new LocalStrategy.Strategy(function verify(username, password, cb) {
    const eff = pipe(
      getLoginByUsername(username),
      Eff.flatMap((user) =>
        validatePassword(password, user.salt, user.hashed_password)
      ),
      Eff.provideContext(C.empty())
    );

    Eff.unsafeRun(eff, (status) => {
      if (status._tag === "Failure") {
        cb(status.cause);
      } else {
        cb(null);
      }
    });
  })
);

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
    cb(null, { id: user.id });
  });
});

passport.deserializeUser<Express.User>(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

var router = express.Router();

/* GET /login
 *
 * This route prompts the user to log in.
 *
 * The 'login' view renders an HTML form, into which the user enters their
 * username and password.  When the user submits the form, a request will be
 * sent to the `POST /login/password` route.
 */
router.get("/login", function (req, res, next) {
  res.render("login");
});

/* POST /login/password
 *
 * This route authenticates the user by verifying a username and password.
 *
 * A username and password are submitted to this route via an HTML form, which
 * was rendered by the `GET /login` route.  The username and password is
 * authenticated using the `local` strategy.  The strategy will parse the
 * username and password from the request and call the `verify` function.
 *
 * Upon successful authentication, a login session will be established.  As the
 * user interacts with the app, by clicking links and submitting forms, the
 * subsequent requests will be authenticated by verifying the session.
 *
 * When authentication fails, the user will be re-prompted to login and shown
 * a message informing them of what went wrong.
 */
router.post(
  "/login/password",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

/* POST /logout
 *
 * This route logs the user out.
 */
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

/* GET /signup
 *
 * This route prompts the user to sign up.
 *
 * The 'signup' view renders an HTML form, into which the user enters their
 * desired username and password.  When the user submits the form, a request
 * will be sent to the `POST /signup` route.
 */
router.get("/signup", function (req, res, next) {
  res.render("signup");
});

// type ReqFunction = (req: express.Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>, resp: )

interface LoginError {
  tag: "login_error";
  cause: unknown;
}
const login = (user: { id: number }) =>
  Eff.serviceWithEffect(ExpressRequestService, ({ request }) =>
    Eff.async<never, LoginError, {}>((resume) => {
      request.login({ id: user.id }, function (err) {
        if (err) {
          resume(Eff.fail({ tag: "login_error", cause: err }));
        } else {
          resume(Eff.succeed({}));
        }
      });
    })
  );

/* POST /signup
 *
 * This route creates a new user account.
 *
 * A desired username and password are submitted to this route via an HTML form,
 * which was rendered by the `GET /signup` route.  The password is hashed and
 * then a new user record is inserted into the database.  If the record is
 * successfully created, the user is logged in.
 */
router.post(
  "/signup",
  effRequestHandler(
    pipe(
      parseBody(S.struct({ username: S.string, password: S.string })),
      Eff.flatMap(({ username, password }) =>
        addUserWithLocalPassword(username, password)
      ),
      Eff.flatMap(({ user }) => login(user))
    )
  )
);

module.exports = router;
