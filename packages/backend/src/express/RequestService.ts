import * as express from "express";
import { Context } from "effect";

export interface ExpressRequest
  extends express.Request<unknown, unknown, unknown, unknown, {}> {}

export interface ExpressRequestService {
  readonly request: ExpressRequest;
  readonly response: express.Response<unknown, {}>;
}

export const ExpressRequestService = Context.Tag<ExpressRequestService>(
  "yaltt/ExpressRequestService"
);
