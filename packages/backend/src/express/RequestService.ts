import * as express from "express";
import { Context } from "effect";

export interface ExpressRequest
  extends express.Request<
    Record<string, string>,
    unknown,
    unknown,
    Record<string, string | string[] | undefined>,
    {}
  > {}

export class ExpressRequestService extends Context.Tag("ExpressRequestService")<
  ExpressRequestService,
  {
    readonly request: ExpressRequest;
    readonly response: express.Response<unknown, {}>;
  }
>() {}
