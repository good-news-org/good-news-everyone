import { MapObject } from "../types/types";
import { Message } from "../models/message";

export const MESSAGES_LOAD = "MESSAGES_LOAD";
export const MESSAGES_LOAD_SUCCESS = "MESSAGES_LOAD_SUCCESS";
export const MESSAGES_LOAD_ERROR = "MESSAGES_LOAD_ERROR";
export const MESSAGE_CREATE = "MESSAGE_CREATE";
export const MESSAGE_CREATE_SUCCESS = "MESSAGE_CREATE_SUCCESS";
export const MESSAGE_CREATE_ERROR = "MESSAGE_CREATE_ERROR";

export type TYPE_MESSAGES_LOAD = "MESSAGES_LOAD";
export type TYPE_MESSAGES_LOAD_SUCCESS = "MESSAGES_LOAD_SUCCESS";
export type TYPE_MESSAGES_LOAD_ERROR = "MESSAGES_LOAD_ERROR";
export type TYPE_MESSAGE_CREATE = "MESSAGE_CREATE";
export type TYPE_MESSAGE_CREATE_SUCCESS = "MESSAGE_CREATE_SUCCESS";
export type TYPE_MESSAGE_CREATE_ERROR = "MESSAGE_CREATE_ERROR";

export type MessagesLoad = {
  type: TYPE_MESSAGES_LOAD;
  payload: string;
};

export type MessagesLoadSuccess = {
  type: TYPE_MESSAGES_LOAD_SUCCESS;
  payload: {
    groupId: string;
    messages: Array<Message>;
  };
};

export type MessagesLoadError = {
  type: TYPE_MESSAGES_LOAD_ERROR;
};

export type MessageCreate = {
  type: TYPE_MESSAGE_CREATE;
  payload: {
    groupId: string;
    text: string;
  };
};

export type MessageCreateSuccess = {
  type: TYPE_MESSAGE_CREATE_SUCCESS;
  payload: {
    groupId: string;
    message: Message;
  };
};

export type MessageCreateError = {
  type: TYPE_MESSAGE_CREATE_ERROR;
  payload: any;
};

export type MessagesActions =
  | MessagesLoad
  | MessagesLoadSuccess
  | MessagesLoadError
  | MessageCreate
  | MessageCreateSuccess
  | MessageCreateError;

export type MessagesActionTypes =
  | TYPE_MESSAGES_LOAD
  | TYPE_MESSAGES_LOAD_SUCCESS
  | TYPE_MESSAGES_LOAD_ERROR
  | TYPE_MESSAGE_CREATE
  | TYPE_MESSAGE_CREATE_SUCCESS
  | TYPE_MESSAGE_CREATE_ERROR;

export const loadMessages = (groupId: string): MessagesLoad => ({
  type: MESSAGES_LOAD,
  payload: groupId
});

export const loadMessagesSuccess = (groupId: string, messages: Array<Message>): MessagesLoadSuccess => ({
  type: MESSAGES_LOAD_SUCCESS,
  payload: { groupId, messages }
});

export const loadMessagesError = (): MessagesLoadError => ({
  type: MESSAGES_LOAD_ERROR
});

export const createMessage = (groupId: string, text: string): MessageCreate => ({
  type: MESSAGE_CREATE,
  payload: { groupId, text }
});

export const createMessageSuccess = (groupId: string, message: Message): MessageCreateSuccess => ({
  type: MESSAGE_CREATE_SUCCESS,
  payload: { groupId, message }
});

export const createMessageError = (error: any): MessageCreateError => ({
  type: MESSAGE_CREATE_ERROR,
  payload: error
});
