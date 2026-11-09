import { CreatedToolConfiguration } from "lti-model";
import { create } from "zustand";
import * as React from "react";

type InputType = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const updateMessage =
  (
    key: string,
    set: (f: (p: MessagesStore) => Partial<MessagesStore>) => void
  ) =>
  (messageType: string) =>
  (event: React.ChangeEvent<InputType>) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [messageType]: {
          ...state.messages[messageType],
          [key]: event.currentTarget.value,
        },
      },
    }));

export const useMessagesStore = create<MessagesStore>()((set) => ({
  messages: {},
  toggleMessage: (messageType: string) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [messageType]: {
          ...state.messages[messageType],
          enabled: !state.messages[messageType]?.enabled,
        },
      },
    })),
  setMessages: (messages: Messages) => set(() => ({ messages })),
  updateCustomParameters: updateMessage("custom_parameters", set),
  updateIconUri: updateMessage("icon_uri", set),
  initializeMessages: (toolConfig: CreatedToolConfiguration) => {
    const messages = toolConfig[
      "https://purl.imsglobal.org/spec/lti-tool-configuration"
    ].messages.reduce((acc: Messages, message) => {
      if ((message.placements || []).length === 0) {
        acc[message.type] = {
          enabled: true,
          custom_parameters: Object.entries(message.custom_parameters || {})
            .map(([k, v]) => `${k}=${v}`)
            .join("\n"),
          icon_uri: message.icon_uri || "",
        };
      }
      return acc;
    }, {} as Messages);

    set((state) => ({
      messages: {
        ...state.messages,
        ...messages,
      },
    }));
  },
}));

export type MessagesStore = {
  messages: Messages;
  toggleMessage: (messageType: string) => void;
  setMessages: (messages: Messages) => void;
  updateCustomParameters: (
    messageType: string
  ) => (event: React.ChangeEvent<InputType>) => void;
  updateIconUri: (
    messageType: string
  ) => (event: React.ChangeEvent<InputType>) => void;
  initializeMessages: (toolConfig: CreatedToolConfiguration) => void;
};

/**
 * Messages without placements, keyed by message type
 */
export type Messages = Record<
  string,
  {
    enabled: boolean;
    custom_parameters: string;
    icon_uri: string;
  }
>;
