import * as express from "express";
import * as passportBase from "passport";
import * as Eff from "@effect/io/Effect";

import * as multer from "multer";
import { parseBody, withRequestBody } from "../../express/parseBody";
import * as S from "@fp-ts/schema";
import { requireAuth } from "../../auth/auth";
import {
  effRequestHandler,
  succcessResponse,
} from "../../express/effRequestHandler";
import { pipe } from "@fp-ts/core/Function";
import { authedRequest } from "../../auth/authedRequestHandler";
import {
  createAppForUser,
  getAppForId,
  getAppsForUser,
} from "../../model/entities/apps";
import { parseParams } from "../../express/parseParams";
import { stringToInteger } from "@yaltt/model";
import { getKeysWithoutPrivateKeyForRegistrationId } from "../../model/entities/keys";

const upload = multer.default();
export const appRouter = express.Router();

export const appIdParam = pipe(
  parseParams(
    S.struct({
      appId: stringToInteger,
    })
  ),
  Eff.map(({ appId }) => appId)
);

appRouter.get(
  "/apps",
  effRequestHandler(
    pipe(authedRequest, Eff.flatMap(getAppsForUser), Eff.map(succcessResponse))
  )
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
      }),
      Eff.map(succcessResponse)
    )
  )
);
