import {
  AppId,
  getApiTokenForRegistration,
  RegistrationId,
} from "@yaltt/model";
import { getDecode } from "../api/request";
import * as S from "@effect/schema/Schema";
import { fetchFromEndpoint } from "../endpoint-ts/fetchFromEndpoint";
import { Effect, Either, Option, ReadonlyArray, pipe } from "effect";

export const fetchToken = (
  appId: AppId,
  registrationId: RegistrationId,
  selectedScopes: readonly string[]
) =>
  fetchFromEndpoint(getApiTokenForRegistration)(
    { appId, registrationId },
    {
      scope: Option.some(selectedScopes.join(",")),
    }
  );
// getDecode(
//   S.struct({
//     access_token: S.string,
//     token_type: S.string,
//     expires_in: S.number,
//     scope: S.string,
//   })
// )(
//   `/api/apps/${appId}/registrations/${registrationId}/token?scope=${selectedScopes.join(
//     ","
//   )}`
// );
