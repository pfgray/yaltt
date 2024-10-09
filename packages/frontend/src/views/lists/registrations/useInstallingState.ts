import { EncodeError } from "@yaltt/model";
import { Effect, pipe } from "effect";
import { create } from "zustand";
import {
  FetchException,
  FetchParseError,
  FetchParseJsonError,
} from "../../../lib/endpoint-ts/fetchFromEndpoint";
import { Request } from "./DynamicRegistration";

type InstallingStateError =
  | FetchException
  | FetchParseError
  | FetchParseJsonError
  | EncodeError;
type InstallingState = {
  install: Request<InstallingStateError, unknown>;
  installTool: <R, A>(
    eff: Effect.Effect<A, InstallingStateError, R>
  ) => Effect.Effect<A, InstallingStateError, R>;
  setInstalling: () => Effect.Effect<void, never, never>;
  setInstallFailed: (
    err: InstallingStateError
  ) => Effect.Effect<void, never, never>;
  setInstallSucceeded: () => Effect.Effect<void, never, never>;
};
export const useInstallingState = create<InstallingState>()((set) => ({
  install: { _tag: "initial" },
  installTool: (eff) =>
    pipe(
      Effect.sync(() => set((state) => ({ install: { _tag: "loading" } }))),
      Effect.flatMap(() => eff),
      Effect.tap(() =>
        Effect.sync(() =>
          set((state) => ({ install: { _tag: "loaded", data: {} } }))
        )
      ),
      Effect.tapError((err) =>
        Effect.sync(() =>
          set((state) => ({
            install: { _tag: "failed", error: err },
          }))
        )
      )
    ),
  setInstalling: () =>
    Effect.sync(() => set((state) => ({ install: { _tag: "loading" } }))),
  setInstallFailed: (err: InstallingStateError) =>
    Effect.sync(() =>
      set((state) => ({
        install: { _tag: "failed", error: err },
      }))
    ),
  setInstallSucceeded: () =>
    Effect.sync(() =>
      set((state) => ({ install: { _tag: "loaded", data: {} } }))
    ),
}));
