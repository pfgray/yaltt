import * as express from "express";
import * as Context from "@fp-ts/data/Context";

export interface ExpressRequestService {
  readonly request: express.Request<unknown, unknown, unknown, unknown, {}>;
  readonly response: express.Response<unknown, {}>;
}

export const ExpressRequestService = Context.Tag<ExpressRequestService>();
