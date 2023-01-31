import * as express from "express";
import * as passportBase from "passport";
import * as Eff from "@effect/io/Effect";

import * as multer from "multer";
import { parseBody, withRequestBody } from "../../express/parseBody";
import * as S from "@fp-ts/schema/Schema";
import { requireAuth } from "../../auth/auth";
import { effRequestHandler } from "../../express/effRequestHandler";
import { pipe } from "@fp-ts/data/Function";
import { authedRequest } from "../../auth/authedRequestHandler";
import {
  createVendorForUser,
  getVendorsForUser,
} from "../../model/entities/vendors";

const upload = multer.default();
export const vendorRouter = express.Router();

vendorRouter.get(
  "/vendors",
  effRequestHandler(
    pipe(
      authedRequest,
      Eff.flatMap(getVendorsForUser),
      Eff.mapError((err) => {
        return err;
      })
    )
  )
);

vendorRouter.post(
  "/vendors",
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
      Eff.flatMap(({ user, body }) => createVendorForUser(body.name, user)),
      Eff.mapError((err) => {
        console.log("Got err:", err);
        return err;
      })
    )
  )
);
