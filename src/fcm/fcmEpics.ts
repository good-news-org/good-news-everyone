import { ofType } from "redux-observable";
import { EMPTY, of } from "rxjs";
import { catchError, filter, map, mergeMap, withLatestFrom } from "rxjs/operators";
import { ActionAuthLoggedIn, AUTH_LOGGED_IN } from "../auth/authActions";
import {
  getEventsStream,
  getToken,
  loadMessage,
  requestPermission,
  updateUserToken
} from "../firebase/firebaseService";
import { createMessageError, createMessageSuccess } from "../messages/messagesActions";
import { AppEpic } from "../types/types";
import {
  fcmEvent,
  FcmEvent,
  FcmGetTokenSuccess,
  FCM_EVENT,
  FCM_GET_TOKEN,
  FCM_GET_TOKEN_SUCCESS,
  FCM_REQUEST_PERMISSION,
  getFcmToken,
  getFcmTokenError,
  getFcmTokenSuccess,
  requestFcmPermission
} from "./fcmActions";

export const subscribeToEvents: AppEpic = action$ =>
  action$.pipe(
    ofType<ActionAuthLoggedIn>(AUTH_LOGGED_IN),
    mergeMap(action =>
      getEventsStream(action.payload.uid).pipe(
        map(x => fcmEvent(x)),
        catchError(x => console.log(x) || EMPTY)
      )
    )
  );

export const handleEvents: AppEpic = action$ =>
  action$.pipe(
    ofType<FcmEvent>(FCM_EVENT),
    mergeMap(action => {
      const messageId = action.payload["data"]["message_id"];
      const groupId = action.payload["data"]["group_id"];
      return loadMessage(groupId, messageId).pipe(
        map(x => createMessageSuccess(groupId, x)),
        catchError(x => of(createMessageError(x)))
      );
    })
  );

export const updateFcmTokenEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType<FcmGetTokenSuccess>(FCM_GET_TOKEN_SUCCESS),
    withLatestFrom(state$),
    mergeMap(([action, state]) => updateUserToken(state.auth.user.uid, action.payload)),
    mergeMap(() => EMPTY)
  );

export const getFcmTokenEpic: AppEpic = action$ =>
  action$.pipe(
    filter(x => x.type === AUTH_LOGGED_IN || x.type === FCM_GET_TOKEN),
    mergeMap(() =>
      getToken().pipe(
        map(token => (token ? getFcmTokenSuccess(token) : requestFcmPermission())),
        catchError(x => of(getFcmTokenError(x)))
      )
    )
  );

export const requestFcmPermissionEpic: AppEpic = action$ =>
  action$.pipe(
    ofType(FCM_REQUEST_PERMISSION),
    mergeMap(() =>
      requestPermission().pipe(
        map(getFcmToken),
        catchError(x => of(getFcmTokenError(x)))
      )
    )
  );
