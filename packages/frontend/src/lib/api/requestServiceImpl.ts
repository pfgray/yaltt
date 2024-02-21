import { Effect } from "effect";
import { RequestService } from "./request";

export const provideRequestService = Effect.provideService(RequestService, {
  config: { baseUrl: import.meta.env.VITE_API_URL },
});
