import * as S from "@effect/schema/Schema";
import { extractClaim } from "./extractClaim";

export const NamesRolesServiceClaimKey =
  "https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice";

export const NamesRolesServiceClaim = S.struct({
  [NamesRolesServiceClaimKey]: S.struct({
    context_memberships_url: S.string,
    service_versions: S.array(S.string),
  }),
});

export type NamesRolesServiceClaim = S.Schema.To<
  typeof NamesRolesServiceClaim
>[typeof NamesRolesServiceClaimKey];

export const extractNamesRolesServiceClaim = extractClaim(
  NamesRolesServiceClaim,
  NamesRolesServiceClaimKey
);
