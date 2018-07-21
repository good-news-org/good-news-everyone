import { Message } from "../models/message";
import { AppActionP, AppAction } from "../types/types";
import { createAction1 } from "../utils/utils";

export const MESSAGES_LOAD = "MESSAGES_LOAD";
export const MESSAGES_LOAD_SUCCESS = "MESSAGES_LOAD_SUCCESS";
export const MESSAGES_LOAD_ERROR = "MESSAGES_LOAD_ERROR";
export const MESSAGE_CREATE = "MESSAGE_CREATE";
export const MESSAGE_CREATE_SUCCESS = "MESSAGE_CREATE_SUCCESS";
export const MESSAGE_CREATE_ERROR = "MESSAGE_CREATE_ERROR";

export type MessagesLoad = AppActionP<typeof MESSAGES_LOAD, string>;
export type MessagesLoadSuccess = AppActionP<
  typeof MESSAGES_LOAD_SUCCESS,
  {
    groupId: string;
    messages: Array<Message>;
  }
>;
export type MessagesLoadError = AppActionP<typeof MESSAGES_LOAD_ERROR, any>;
export type MessageCreate = AppActionP<
  typeof MESSAGE_CREATE,
  {
    groupId: string;
    text: string;
  }
>;
export type MessageCreateSuccess = AppActionP<
  typeof MESSAGE_CREATE_SUCCESS,
  {
    groupId: string;
    message: Message;
  }
>;
export type MessageCreateError = AppActionP<typeof MESSAGE_CREATE_ERROR, any>;

export const loadMessages = (groupId: string): MessagesLoad => createAction1(MESSAGES_LOAD, groupId);
export const loadMessagesSuccess = (groupId: string, messages: Array<Message>): MessagesLoadSuccess =>
  createAction1(MESSAGES_LOAD_SUCCESS, { groupId, messages });
export const loadMessagesError = (error: any): MessagesLoadError => createAction1(MESSAGES_LOAD_ERROR, error);
export const createMessage = (groupId: string, text: string): MessageCreate =>
  createAction1(MESSAGE_CREATE, { groupId, text });
export const createMessageSuccess = (groupId: string, message: Message): MessageCreateSuccess =>
  createAction1(MESSAGE_CREATE_SUCCESS, { groupId, message });
export const createMessageError = (error: any): MessageCreateError => createAction1(MESSAGE_CREATE_ERROR, error);
