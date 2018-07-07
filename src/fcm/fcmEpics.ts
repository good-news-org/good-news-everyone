import { ofType } from "redux-observable";
import { Observable, of, EMPTY } from "rxjs";
import { map, mergeMap, catchError, filter, withLatestFrom, mapTo } from "rxjs/operators";
import { AUTH_INIT, AUTH_LOGGED_IN } from "../auth/authActions";
import { getToken, requestPermission, updateUserToken } from "../firebase/firebaseService";
import { AppAction, AppState } from "../types/types";
import {
  getFcmTokenSuccess,
  getFcmTokenError,
  requestFcmPermission,
  FCM_REQUEST_PERMISSION,
  FCM_GET_TOKEN_SUCCESS,
  FCM_GET_TOKEN,
  getFcmToken,
  FcmGetTokenSuccess
} from "./fcmActions";

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
