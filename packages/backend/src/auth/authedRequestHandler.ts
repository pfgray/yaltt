import { pipe, Effect, Option, Either } from "effect";

import { ExpressRequestService } from "../express/RequestService";

export interface UnauthenticatedError {
  _tag: "unauthenticated_error";
}

export const unauthenticatedError = (): UnauthenticatedError => ({
  _tag: "unauthenticated_error",
});

export interface UnauthorizedError {
  _tag: "unauthorized_error";
  message: string;
}

export const unauthorizedError = (message: string): UnauthorizedError => ({
  _tag: "unauthorized_error",
  message,
});

export const authedRequest = ExpressRequestService.pipe(
  Effect.flatMap(({ request, response }) =>
    pipe(
      request.user,
      Option.fromNullable,
      Effect.mapError(unauthenticatedError)
    )
  )
);
