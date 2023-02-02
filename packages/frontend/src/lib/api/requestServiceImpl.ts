import * as Eff from "@effect/io/Effect";
import { RequestService } from "./request";

export const provideRequestService = Eff.provideService(RequestService, {
  config: { baseUrl: import.meta.env.VITE_API_URL },
});
