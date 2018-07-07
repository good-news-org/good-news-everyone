import { set } from "immutadot";
import { addUnique } from "src/utils/utils";
import { MessagesState, StateReducers, StateReducer } from "../types/types";
import {
  MessageCreateSuccess,
  MessagesLoadSuccess,
  MESSAGES_LOAD_SUCCESS,
  MESSAGE_CREATE_SUCCESS
} from "./messagesActions";
import { createReducer } from "../app/appReducer";

const initialState: MessagesState = {
  messages: {}
};

const messagesLoadSuccess: StateReducer<MessagesState, MessagesLoadSuccess> = (state, action) => ({
  ...state,
  messages: set(state.messages, action.payload.groupId, action.payload.messages)
});

const messageCreateSuccess: StateReducer<MessagesState, MessageCreateSuccess> = (state, action) => ({
  ...state,
  messages: {
    ...state.messages,
    [action.payload.groupId]: addUnique(state.messages[action.payload.groupId], action.payload.message)
  }
});

const handlers: StateReducers<MessagesState> = {
  [MESSAGES_LOAD_SUCCESS]: messagesLoadSuccess,
  [MESSAGE_CREATE_SUCCESS]: messageCreateSuccess
};

export const messagesReducer = createReducer(handlers, initialState);
