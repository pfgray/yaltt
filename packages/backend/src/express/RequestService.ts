import * as express from "express";
import { Context } from "effect";

export interface ExpressRequestService {
  readonly request: express.Request<unknown, unknown, unknown, unknown, {}>;
  readonly response: express.Response<unknown, {}>;
}

export const ExpressRequestService = Context.Tag<ExpressRequestService>(
  "yaltt/ExpressRequestService"
);
