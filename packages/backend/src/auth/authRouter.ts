import * as express from "express";
import * as passportBase from "passport";

import * as multer from "multer";
import { requireAuth } from "./auth";
import { signupPasswordRoute } from "./strategies/local";
import "./strategies/google";

const upload = multer.default();
export const authRouter = express.Router();
const passport = (passportBase as any).default as typeof passportBase;

authRouter.post(
  "/login/password",
  upload.none(),
  passport.authenticate("local", {
    // successReturnToOrRedirect: "/api/me",
    // failureRedirect: "/api/me",
    failureMessage: true,
  }),
  (req, resp) => {
    resp.json({ success: true });
  }
);

authRouter.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

authRouter.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
);

authRouter.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ success: true });
  });
});

authRouter.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

authRouter.post("/signup/password", signupPasswordRoute);

authRouter.get("/me", requireAuth, function (req, res, next) {
  res.json(req.user);
});

authRouter.get("/loginMechanisms", function (req, res, next) {
  res.json({
    types: ["local", ...(process.env["GOOGLE_CLIENT_ID"] ? ["google"] : [])],
  });
});
