import { getDecode } from "../api/request";
import * as S from "@effect/schema/Schema";

export const fetchToken = (appId: number, registrationId: number) =>
  getDecode(
    S.struct({
      access_token: S.string,
      token_type: S.string,
      expires_in: S.number,
      scope: S.string,
    })
  )(`/api/apps/${appId}/registrations/${registrationId}/token`);
