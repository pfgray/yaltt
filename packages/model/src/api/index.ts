// Import all endpoint definitions
import * as users from "./users";
import * as apps from "./apps";
import * as auth from "./auth";
import * as registrations from "./registrations";
import * as ags from "./ags";
import * as launch from "./launch";

/**
 * Unified API object containing all endpoint definitions.
 *
 * This is a pure definition object with no runtime dependencies.
 * Use `createApiClient` from `endpoint-ts-fetch` to convert these
 * definitions into callable fetch functions for the browser.
 *
 * Usage:
 * ```typescript
 * import { API } from "@yaltt/model";
 * import { createApiClient } from "endpoint-ts-fetch";
 *
 * const api = createApiClient(API);
 *
 * api.apps.getApps()
 * api.apps.getApp({ appId: 1 })
 * api.apps.createApp({ name: "My App", ... })
 * ```
 */
export const YalttAPIDef = {
  users: {
    getUsers: users.getUsers,
    getUser: users.getUser,
    createPasswordUser: users.createPasswordUser,
  },
  apps: {
    getApps: apps.getApps,
    getApp: apps.getApp,
    deleteApp: apps.deleteApp,
    createApp: apps.createApp,
  },
  auth: {
    getLoginMechanisms: auth.getLoginMechanisms,
  },
  registrations: {
    getRegistrations: registrations.getRegistrations,
    getRegistration: registrations.getRegistration,
    createRegistration: registrations.createRegistration,
    getConfiguration: registrations.getConfiguration,
    getCanvasConfiguration: registrations.getCanvasConfiguration,
    getPublicJwkSet: registrations.getPublicJwkSet,
    createToolInstallation: registrations.createToolInstallation,
    createNewAppInstallation: registrations.createNewAppInstallation,
    getOpenidConfig: registrations.getOpenidConfig,
    deleteRegistration: registrations.deleteRegistration,
    getApiTokenForRegistration: registrations.getApiTokenForRegistration,
    signDeepLinkingContentItems: registrations.signDeepLinkingContentItems,
    getSavedConfigurationForRegistration:
      registrations.getSavedConfigurationForRegistration,
    signUpdateRequest: registrations.signUpdateRequest,
    getRegistrationFromPlatform: registrations.getRegistrationFromPlatform,
    sendRegistrationUpdate: registrations.sendRegistrationUpdate,
  },
  ags: {
    createScoreForUser: ags.createScoreForUser,
    createLineItem: ags.createLineItem,
  },
  launch: {
    getLaunch: launch.getLaunch,
  },
} as const;

export type YalttAPIDef = typeof YalttAPIDef;
