export const FCM_GET_TOKEN = "FCM_GET_TOKEN";
export const FCM_GET_TOKEN_SUCCESS = "FCM_GET_TOKEN_SUCCESS";
export const FCM_GET_TOKEN_ERROR = "FCM_GET_TOKEN_ERROR";
export const FCM_REQUEST_PERMISSION = "FCM_REQUEST_PERMISSION";

export type TYPE_FCM_GET_TOKEN = "FCM_GET_TOKEN";
export type TYPE_FCM_GET_TOKEN_SUCCESS = "FCM_GET_TOKEN_SUCCESS";
export type TYPE_FCM_GET_TOKEN_ERROR = "FCM_GET_TOKEN_ERROR";
export type TYPE_FCM_REQUEST_PERMISSION = "FCM_REQUEST_PERMISSION";

export const FCM_EVENT = "FCM_EVENT";
export type TYPE_FCM_EVENT = "FCM_EVENT";

export type FcmGetToken = {
  type: TYPE_FCM_GET_TOKEN;
};

export type FcmGetTokenSuccess = {
  type: TYPE_FCM_GET_TOKEN_SUCCESS;
  payload: string;
};

export type FcmGetTokenError = {
  type: TYPE_FCM_GET_TOKEN_ERROR;
};

export type FcmRequestPermission = {
  type: TYPE_FCM_REQUEST_PERMISSION;
};

export type FcmEvent = {
  type: TYPE_FCM_EVENT;
  payload: object;
};

export type FcmActions = FcmGetToken | FcmGetTokenSuccess | FcmGetTokenError | FcmRequestPermission | FcmEvent;

export type FcmActionTypes =
  | TYPE_FCM_GET_TOKEN
  | TYPE_FCM_GET_TOKEN_SUCCESS
  | TYPE_FCM_GET_TOKEN_ERROR
  | TYPE_FCM_REQUEST_PERMISSION
  | TYPE_FCM_EVENT;

export const getFcmToken = (): FcmGetToken => ({
  type: FCM_GET_TOKEN
});

export const getFcmTokenSuccess = (token: string): FcmGetTokenSuccess => ({
  type: FCM_GET_TOKEN_SUCCESS,
  payload: token
});

export const getFcmTokenError = (): FcmGetTokenError => ({
  type: FCM_GET_TOKEN_ERROR
});

export const requestFcmPermission = (): FcmRequestPermission => ({
  type: FCM_REQUEST_PERMISSION
});

export const fcmEvent = (data: object): FcmEvent => ({
  type: FCM_EVENT,
  payload: data
});
