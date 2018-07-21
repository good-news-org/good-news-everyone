import { AppAction, AppActionP } from "../types/types";
import { createAction, createAction1 } from "../utils/utils";

export const FCM_GET_TOKEN = "FCM_GET_TOKEN";
export const FCM_GET_TOKEN_SUCCESS = "FCM_GET_TOKEN_SUCCESS";
export const FCM_GET_TOKEN_ERROR = "FCM_GET_TOKEN_ERROR";
export const FCM_REQUEST_PERMISSION = "FCM_REQUEST_PERMISSION";
export const FCM_EVENT = "FCM_EVENT";

export type FcmGetToken = AppAction<typeof FCM_GET_TOKEN>;
export type FcmGetTokenSuccess = AppActionP<typeof FCM_GET_TOKEN_SUCCESS, string>;
export type FcmGetTokenError = AppActionP<typeof FCM_GET_TOKEN_ERROR, any>;
export type FcmRequestPermission = AppAction<typeof FCM_REQUEST_PERMISSION>;
export type FcmEvent = AppActionP<typeof FCM_EVENT, object>;

export const getFcmToken = (): FcmGetToken => createAction(FCM_GET_TOKEN);
export const getFcmTokenSuccess = (token: string): FcmGetTokenSuccess => createAction1(FCM_GET_TOKEN_SUCCESS, token);
export const getFcmTokenError = (error: any): FcmGetTokenError => createAction1(FCM_GET_TOKEN_ERROR, error);
export const requestFcmPermission = (): FcmRequestPermission => createAction(FCM_REQUEST_PERMISSION);
export const fcmEvent = (data: object): FcmEvent => createAction1(FCM_EVENT, data);
