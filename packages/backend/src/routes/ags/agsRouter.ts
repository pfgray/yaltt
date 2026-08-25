import { Effect, pipe } from "effect";
import * as express from "express";

import { createScoreForUser, createLineItem } from "@yaltt/model";
import { LtiScope } from "lti-model";
import { bindEndpoint } from "../../express/endpointRequestHandler";
import { Fetch } from "../../fetch/FetchService";
import { fetchToken } from "../../tokens/tokens";
import { requireLti13Registration } from "../../model/entities/registrations";

import { registrationAndApp } from "../registrations/registrationsRouter";

export const agsRouter = express.Router();
const bindAgsEndpoint = bindEndpoint(agsRouter);

bindAgsEndpoint(createScoreForUser)(({ appId, registrationId }, query, score) =>
  pipe(
    registrationAndApp(appId, registrationId),
    Effect.flatMap(({ registration }) =>
      requireLti13Registration(registration, "AGS not supported for LTI 1.1 registrations")
    ),
    Effect.flatMap((registration) =>
      fetchToken(registration, [LtiScope.AgsLineItem, LtiScope.AgsScore])
    ),
    Effect.flatMap((token) =>
      Fetch.post(query.lineItemUrl + "/scores", score, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/vnd.ims.lis.v1.score+json",
        },
      })
    )
  )
);

bindAgsEndpoint(createLineItem)(({ appId, registrationId }, query, lineItem) =>
  pipe(
    registrationAndApp(appId, registrationId),
    Effect.flatMap(({ registration }) =>
      requireLti13Registration(registration, "AGS not supported for LTI 1.1 registrations")
    ),
    Effect.flatMap((registration) =>
      fetchToken(registration, [LtiScope.AgsLineItem])
    ),
    Effect.flatMap((token) =>
      Fetch.post(query.lineItemsUrl, lineItem, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/vnd.ims.lis.v2.lineitem+json",
        },
      })
    )
  )
);
