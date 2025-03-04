import * as express from "express";
import * as passportBase from "passport";

import * as multer from "multer";
import { requireAuth } from "./auth";
import { signupPasswordRoute } from "./strategies/local";
import "./strategies/google";

const upload = multer.default();
export const authRouter = express.Router();
const passport = (passportBase as any).default as typeof passportBase;

authRouter.post("/login/password", upload.none(), function (req, res, next) {
  console.log("password login?", req.body);
  passport.authenticate("local", function callback(err, user, info, status) {
    if (err) {
      return res.status(500).json({ failed: true, server_error: true });
    }
    if (!user) {
      return res.status(401).json({ failed: true, server_error: true });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({ failed: true, server_error: true });
      }
      return res.json({ success: true });
    });
  } satisfies passportBase.AuthenticateCallback)(req, res, next);
});

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
