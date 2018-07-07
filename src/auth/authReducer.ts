import { AppAction, AuthStateReducer, AuthState } from "../types/types";
import {
  AUTH_REQUEST_CODE_SUCCESS,
  AUTH_LOGGED_IN,
  ActionAuthLoggedIn,
  ActionAuthRequestCodeSuccess,
  AUTH_LOGGED_OUT
} from "./authActions";

const initialState: AuthState = {
  initialized: false,
  user: undefined,
  confirmationResult: undefined
};

const requestCodeSuccess = (state: AuthState, action: ActionAuthRequestCodeSuccess) => ({
  ...state,
  initialized: true,
  confirmationResult: action.payload
});

const loggedIn = (state: AuthState, action: ActionAuthLoggedIn): AuthState => ({
  ...state,
  initialized: true,
  user: action.payload
});

const loggedOut = (state: AuthState) => ({
  ...state,
  initialized: true,
  user: undefined
});

const handlers: { [key: string]: AuthStateReducer } = {
  [AUTH_REQUEST_CODE_SUCCESS]: requestCodeSuccess,
  [AUTH_LOGGED_IN]: loggedIn,
  [AUTH_LOGGED_OUT]: loggedOut
};

export const authReducer = (state: AuthState = initialState, action: AppAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;
