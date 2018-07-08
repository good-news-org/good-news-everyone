import { ofType } from "redux-observable";
import { Observable, of, EMPTY } from "rxjs";
import { map, mergeMap, catchError, filter, withLatestFrom, mapTo } from "rxjs/operators";
import { AUTH_INIT, AUTH_LOGGED_IN, ActionAuthLoggedIn } from "../auth/authActions";
import {
  getToken,
  requestPermission,
  updateUserToken,
  getEventsStream,
  loadMessage
} from "../firebase/firebaseService";
import { AppAction, AppState } from "../types/types";
import {
  getFcmTokenSuccess,
  getFcmTokenError,
  requestFcmPermission,
  FCM_REQUEST_PERMISSION,
  FCM_GET_TOKEN_SUCCESS,
  FCM_GET_TOKEN,
  getFcmToken,
  FcmGetTokenSuccess,
  fcmEvent,
  FCM_EVENT,
  FcmEvent
} from "./fcmActions";
import { createMessageSuccess, createMessageError } from "../messages/messagesActions";
import { MessageCreate } from "../messages/create/MessageCreate";

export const subscribeToEvents = (action$: Observable<AppAction>) =>
  action$.pipe(
    ofType<ActionAuthLoggedIn>(AUTH_LOGGED_IN),
    mergeMap(action =>
      getEventsStream(action.payload.uid).pipe(
        map(x => fcmEvent(x)),
        catchError(x => console.log(x) || EMPTY)
      )
    )
  );

export const handleEvents = (action$: Observable<AppAction>) =>
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

export const updateFcmTokenEpic = (action$: Observable<AppAction>, state$: Observable<AppState>) =>
  action$.pipe(
    ofType<FcmGetTokenSuccess>(FCM_GET_TOKEN_SUCCESS),
    withLatestFrom(state$),
    mergeMap(([action, state]) => updateUserToken(state.auth.user.uid, action.payload)),
    mergeMap(() => EMPTY)
  );

export const getFcmTokenEpic = (action$: Observable<AppAction>) =>
  action$.pipe(
    filter(x => x.type === AUTH_LOGGED_IN || x.type === FCM_GET_TOKEN),
    mergeMap(() =>
      getToken().pipe(
        map(token => (token ? getFcmTokenSuccess(token) : requestFcmPermission())),
        catchError(x => of(getFcmTokenError()))
      )
    )
  );

export const requestFcmPermissionEpic = (action$: Observable<AppAction>) =>
  action$.pipe(
    ofType(FCM_REQUEST_PERMISSION),
    mergeMap(() =>
      requestPermission().pipe(
        map(getFcmToken),
        catchError(x => of(getFcmTokenError()))
      )
    )
  );
