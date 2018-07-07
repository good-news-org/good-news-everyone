import { AppAction, MessagesState, AppActionType, StateReducer } from "../types/types";
import {
  MESSAGES_LOAD_SUCCESS,
  MessagesLoadSuccess,
  MessageCreateSuccess,
  MESSAGE_CREATE_SUCCESS
} from "./messagesActions";
import { set, push } from "immutadot";

const initialState: MessagesState = {
  messages: {}
};

const messagesLoadSuccess = (state: MessagesState, action: MessagesLoadSuccess): MessagesState => ({
  ...state,
  messages: set(state.messages, action.payload.groupId, action.payload.messages)
});

type HasId = {
  id: string;
};

const addUnique = <T>(items: Array<T & HasId>, item: T & HasId): Array<T> => {
  console.log(items.some(x => x.id === item.id), items, item);
  return items.some(x => x.id === item.id) ? items : [...items, item];
};

const messageCreateSuccess = (state: MessagesState, action: MessageCreateSuccess): MessagesState => {
  console.log("A", action);
  console.log(addUnique(state.messages[action.payload.groupId], action.payload.message));
  return {
    ...state,
    messages: {
      ...state.messages,
      [action.payload.groupId]: addUnique(state.messages[action.payload.groupId], action.payload.message)
    }
  };
};

const handlers: { [t in AppActionType]?: StateReducer<MessagesState> } = {
  [MESSAGES_LOAD_SUCCESS]: messagesLoadSuccess,
  [MESSAGE_CREATE_SUCCESS]: messageCreateSuccess
};

export const messagesReducer = (state: MessagesState = initialState, action: AppAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;
