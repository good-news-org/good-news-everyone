import { ConfirmationResult } from "@firebase/auth-types";
import { User } from "firebase";

export const AUTH_INIT = "AUTH_INIT";
export const AUTH_REQUEST_CODE = "AUTH_REQUEST_CODE";
export const AUTH_REQUEST_CODE_SUCCESS = "AUTH_REQUEST_CODE_SUCCESS";
export const AUTH_LOG_IN = "AUTH_LOG_IN";
export const AUTH_LOG_OUT = "AUTH_LOG_OUT";
export const AUTH_LOGGED_IN = "AUTH_LOGGED_IN";
export const AUTH_LOGGED_OUT = "AUTH_LOGGED_OUT";

export type TYPE_AUTH_INIT = "AUTH_INIT";
export type TYPE_AUTH_REQUEST_CODE = "AUTH_REQUEST_CODE";
export type TYPE_AUTH_REQUEST_CODE_SUCCESS = "AUTH_REQUEST_CODE_SUCCESS";
export type TYPE_AUTH_LOG_IN = "AUTH_LOG_IN";
export type TYPE_AUTH_LOG_OUT = "AUTH_LOG_OUT";
export type TYPE_AUTH_LOGGED_IN = "AUTH_LOGGED_IN";
export type TYPE_AUTH_LOGGED_OUT = "AUTH_LOGGED_OUT";

export type ActionAuthInit = {
  type: TYPE_AUTH_INIT;
};

export type ActionAuthRequestCode = {
  type: TYPE_AUTH_REQUEST_CODE;
  payload: string;
};

export type ActionAuthRequestCodeSuccess = {
  type: TYPE_AUTH_REQUEST_CODE_SUCCESS;
  payload: ConfirmationResult;
};

export type ActionAuthLogIn = {
  type: TYPE_AUTH_LOG_IN;
  payload: string;
};

export type ActionAuthLogOut = {
  type: TYPE_AUTH_LOG_OUT;
};

export type ActionAuthLoggedIn = {
  type: TYPE_AUTH_LOGGED_IN;
  payload: User;
};

export type ActionAuthLoggedOut = {
  type: TYPE_AUTH_LOGGED_OUT;
};

export type AuthActions =
  | ActionAuthInit
  | ActionAuthRequestCode
  | ActionAuthRequestCodeSuccess
  | ActionAuthLogIn
  | ActionAuthLogOut
  | ActionAuthLoggedIn
  | ActionAuthLoggedOut;

export type AuthActionTypes =
  | TYPE_AUTH_INIT
  | TYPE_AUTH_REQUEST_CODE
  | TYPE_AUTH_REQUEST_CODE_SUCCESS
  | TYPE_AUTH_LOG_IN
  | TYPE_AUTH_LOG_OUT
  | TYPE_AUTH_LOGGED_IN
  | TYPE_AUTH_LOGGED_OUT;

export const authInit = (): ActionAuthInit => ({
  type: AUTH_INIT
});

export const authRequestCode = (phone: string): ActionAuthRequestCode => ({
  type: AUTH_REQUEST_CODE,
  payload: phone
});

export const authRequestCodeSuccess = (confirmationResult: ConfirmationResult): ActionAuthRequestCodeSuccess => ({
  type: AUTH_REQUEST_CODE_SUCCESS,
  payload: confirmationResult
});

export const authLogIn = (code: string): ActionAuthLogIn => ({
  type: AUTH_LOG_IN,
  payload: code
});

export const authLoggedIn = (user: User): ActionAuthLoggedIn => ({
  type: AUTH_LOGGED_IN,
  payload: user
});
export const authLogout = (): ActionAuthLogOut => ({
    type: AUTH_LOG_OUT
});
export const authLoggedOut = (): ActionAuthLoggedOut => ({
  type: AUTH_LOGGED_OUT
});
