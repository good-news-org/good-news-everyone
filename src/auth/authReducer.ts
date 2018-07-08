import { AuthState, StateReducers, StateReducer, AppAction } from "../types/types";
import {
  AUTH_REQUEST_CODE_SUCCESS,
  AUTH_LOGGED_IN,
  ActionAuthLoggedIn,
  ActionAuthRequestCodeSuccess,
  AUTH_LOGGED_OUT
} from "./authActions";
import { createReducer } from "../utils/utils";

const initialState: AuthState = {
  initialized: false,
  user: undefined,
  confirmationResult: undefined
};

const requestCodeSuccess: StateReducer<AuthState, ActionAuthRequestCodeSuccess> = (state, action) => ({
  ...state,
  initialized: true,
  confirmationResult: action.payload
});

const loggedIn: StateReducer<AuthState, ActionAuthLoggedIn> = (state, action) => ({
  ...state,
  initialized: true,
  user: action.payload
});

const loggedOut = (state: AuthState) => ({
  ...state,
  initialized: true,
  user: undefined
});

const handlers: StateReducers<AuthState> = {
  [AUTH_REQUEST_CODE_SUCCESS]: requestCodeSuccess,
  [AUTH_LOGGED_IN]: loggedIn,
  [AUTH_LOGGED_OUT]: loggedOut
};

export const authReducer = createReducer(handlers, initialState);
