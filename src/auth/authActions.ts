import { ConfirmationResult } from "@firebase/auth-types";
import { User } from "firebase";
import { createAction, createAction1 } from "../utils/utils";
import { AppAction, AppActionP } from "../types/types";

export const AUTH_INIT = "AUTH_INIT";
export const AUTH_REQUEST_CODE = "AUTH_REQUEST_CODE";
export const AUTH_REQUEST_CODE_SUCCESS = "AUTH_REQUEST_CODE_SUCCESS";
export const AUTH_LOG_IN = "AUTH_LOG_IN";
export const AUTH_LOG_OUT = "AUTH_LOG_OUT";
export const AUTH_LOGGED_IN = "AUTH_LOGGED_IN";
export const AUTH_LOGGED_OUT = "AUTH_LOGGED_OUT";

export type ActionAuthInit = AppAction<typeof AUTH_INIT>;
export type ActionAuthRequestCode = AppActionP<typeof AUTH_REQUEST_CODE, string>;
export type ActionAuthRequestCodeSuccess = AppActionP<typeof AUTH_REQUEST_CODE_SUCCESS, ConfirmationResult>;
export type ActionAuthLogIn = AppActionP<typeof AUTH_LOG_IN, string>;
export type ActionAuthLogOut = AppAction<typeof AUTH_LOG_OUT>;
export type ActionAuthLoggedIn = AppActionP<typeof AUTH_LOGGED_IN, User>;
export type ActionAuthLoggedOut = AppAction<typeof AUTH_LOGGED_OUT>;

export const authInit = (): ActionAuthInit => createAction(AUTH_INIT);
export const authRequestCode = (phone: string): ActionAuthRequestCode => createAction1(AUTH_REQUEST_CODE, phone);
export const authRequestCodeSuccess = (confirmationResult: ConfirmationResult): ActionAuthRequestCodeSuccess =>
  createAction1(AUTH_REQUEST_CODE_SUCCESS, confirmationResult);
export const authLogIn = (code: string): ActionAuthLogIn => createAction1(AUTH_LOG_IN, code);
export const authLoggedIn = (user: User): ActionAuthLoggedIn => createAction1(AUTH_LOGGED_IN, user);
export const authLogout = (): ActionAuthLogOut => createAction(AUTH_LOG_OUT);
export const authLoggedOut = (): ActionAuthLoggedOut => createAction(AUTH_LOGGED_OUT);
