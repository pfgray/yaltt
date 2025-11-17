import { CreatedToolConfiguration } from "lti-model";
import { create } from "zustand";
import * as React from "react";

export const updatePlacement =
  (
    key: string,
    set: (f: (p: PlacementsStore) => Partial<PlacementsStore>) => void
  ) =>
  (placementType: string) =>
  (event: React.ChangeEvent<InputType>) =>
    set((state) => ({
      placements: {
        ...state.placements,
        [placementType]: {
          ...state.placements[placementType],
          [key]: event.currentTarget.value,
        },
      },
    }));

export const usePlacementsStore = create<PlacementsStore>()((set) => ({
  placements: {},
  togglePlacement: (placement: string) =>
    set((state) => {
      return {
        placements: {
          ...state.placements,
          [placement]: {
            ...state.placements[placement],
            enabled: !state.placements[placement]?.enabled,
          },
        },
      };
    }),
  setPlacements: (placements: Placements) =>
    set((state) => {
      console.log("current state", placements);
      return { placements };
    }),
  updateMessageType: updatePlacement("message_type", set),
  updateLabel: updatePlacement("label", set),
  updateCustomParameters: updatePlacement("custom_parameters", set),
  updateIconUri: updatePlacement("icon_uri", set),
  updateRoles: updatePlacement("roles", set),
  initializePlacements: (toolConfig: CreatedToolConfiguration) => {
    const placements = toolConfig[
      "https://purl.imsglobal.org/spec/lti-tool-configuration"
    ].messages.reduce((acc: Placements, message) => {
      (message.placements || []).forEach((placement) => {
        console.log("initializing placement:", placement, message);
        acc[placement] = {
          enabled: true,
          message_type: message.type,
          custom_parameters: Object.entries(message.custom_parameters || {})
            .map(([k, v]) => `${k}=${v}`)
            .join("\n"),
          icon_uri: message.icon_uri || "",
          roles: (message.roles || []).join(", "),
          label: message.label || "",
        };
      });
      return acc;
    }, {} as Placements);

    set((state) => ({
      placements: {
        ...state.placements,
        ...placements,
      },
    }));
  },
}));

export type PlacementsStore = {
  placements: Placements;
  togglePlacement: (placement: string) => void;
  setPlacements: (placments: Placements) => void;
  updateLabel: (
    placement: string
  ) => (event: React.ChangeEvent<InputType>) => void;
  updateMessageType: (
    placement: string
  ) => (message_type: React.ChangeEvent<InputType>) => void;
  updateCustomParameters: (
    placement: string
  ) => (custom_parameters: React.ChangeEvent<InputType>) => void;
  updateIconUri: (
    placement: string
  ) => (icon_uri: React.ChangeEvent<InputType>) => void;
  updateRoles: (
    placement: string
  ) => (roles: React.ChangeEvent<InputType>) => void;
  initializePlacements: (toolConfig: CreatedToolConfiguration) => void;
};

export type Placements = Record<
  string,
  {
    enabled: boolean;
    message_type: string;
    custom_parameters: string;
    icon_uri: string;
    roles: string;
    label: string;
  }
>;
export type InputType =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;
