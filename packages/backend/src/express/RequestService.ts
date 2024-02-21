import * as express from "express";
import { Context } from "effect";

export interface ExpressRequest
  extends express.Request<unknown, unknown, unknown, unknown, {}> {}

export class ExpressRequestService extends Context.Tag("ExpressRequestService")<
  ExpressRequestService,
  {
    readonly request: ExpressRequest;
    readonly response: express.Response<unknown, {}>;
  }
>() {}
