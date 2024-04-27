import { Effect, pipe } from "effect";
import * as express from "express";

import { createScoreForUser } from "@yaltt/model";
import { LtiScope } from "lti-model";
import { bindEndpoint } from "../../express/endpointRequestHandler";
import { Fetch } from "../../fetch/FetchService";
import { fetchToken } from "../../tokens/tokens";

import { registrationAndApp } from "../registrations/registrationsRouter";

export const agsRouter = express.Router();
const bindAgsEndpoint = bindEndpoint(agsRouter);

bindAgsEndpoint(createScoreForUser)(({ appId, registrationId }, query, score) =>
  pipe(
    registrationAndApp(appId, registrationId),
    Effect.flatMap(({ registration }) =>
      fetchToken(registration, [LtiScope.AgsLineItem, LtiScope.AgsScore])
    ),
    Effect.flatMap((token) => {
      return Fetch.post(query.lineItemUrl + "/scores", score, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });
    })
  )
);
