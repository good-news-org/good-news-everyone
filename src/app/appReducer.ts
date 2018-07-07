import { combineReducers } from "redux";
import { authReducer } from "../auth/authReducer";
import { reducer as formReducer } from "redux-form";
import { groupsReducer } from "../groups/groupsReducer";
import { messagesReducer } from "../messages/messagesReducer";
import { StateReducers, AppAction } from "../types/types";

export const appReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  groups: groupsReducer,
  messages: messagesReducer
});

export const createReducer = <S>(handlers: StateReducers<S>, initialState: S) => (
  state: S = initialState,
  action: AppAction
) => (handlers[action.type] ? handlers[action.type](state, action) : state);
