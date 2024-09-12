import * as S from "@effect/schema/Schema";
import { pipe } from "effect";
import { Body, Endpoint, QP, Response, path } from "endpoint-ts";
import { Score, LineItem } from "lti-model";
import {
  appRegistrationsRegistrationRoute,
  registrationRoute,
} from "./registrations";

export const createScoreForUser = Endpoint.post(
  pipe(appRegistrationsRegistrationRoute, path("createScore")),
  {
    lineItemUrl: QP.single(S.string),
  },
  Response.json(S.unknown),
  Body.json(Score)
);

export const createLineItem = Endpoint.post(
  pipe(appRegistrationsRegistrationRoute, path("createLineItem")),
  {
    lineItemsUrl: QP.single(S.string),
  },
  Response.json(S.unknown),
  Body.json(LineItem)
);
