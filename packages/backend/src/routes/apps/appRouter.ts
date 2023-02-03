import * as express from "express";
import * as passportBase from "passport";
import * as Eff from "@effect/io/Effect";

import * as multer from "multer";
import { parseBody, withRequestBody } from "../../express/parseBody";
import * as S from "@fp-ts/schema";
import { requireAuth } from "../../auth/auth";
import { effRequestHandler } from "../../express/effRequestHandler";
import { pipe } from "@fp-ts/core/Function";
import { authedRequest } from "../../auth/authedRequestHandler";
import { createAppForUser, getAppsForUser } from "../../model/entities/apps";

const upload = multer.default();
export const appRouter = express.Router();

appRouter.get(
  "/apps",
  effRequestHandler(pipe(authedRequest, Eff.flatMap(getAppsForUser)))
);

appRouter.post(
  "/apps",
  effRequestHandler(
    pipe(
      Eff.Do(),
      Eff.bind("user", () => authedRequest),
      Eff.bind("body", () =>
        parseBody(
          S.struct({
            name: S.string,
          })
        )
      ),
      Eff.flatMap(({ user, body }) => createAppForUser(body.name, user)),
      Eff.mapError((err) => {
        console.log("Got err:", err);
        return err;
      })
    )
  )
);
