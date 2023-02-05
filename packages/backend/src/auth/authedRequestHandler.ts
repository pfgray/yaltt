import * as Eff from "@effect/io/Effect";
import { pipe } from "@fp-ts/core/Function";
import * as O from "@fp-ts/core/Option";
import { ExpressRequestService } from "../express/RequestService";

export interface UnauthenticatedError {
  tag: "unauthenticated_error";
}

export const unauthenticatedError = (): UnauthenticatedError => ({
  tag: "unauthenticated_error",
});

export interface UnauthorizedError {
  tag: "unauthorized_error";
  message: string;
}

export const unauthorizedError = (message: string): UnauthorizedError => ({
  tag: "unauthorized_error",
  message,
});

export const authedRequest = pipe(
  Eff.service(ExpressRequestService),
  Eff.flatMap(({ request, response }) =>
    pipe(
      request.user,
      O.fromNullable,
      Eff.fromOption,
      Eff.mapError(unauthenticatedError)
    )
  )
);
