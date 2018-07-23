import { ofType } from "redux-observable";
import { map, mergeMap, withLatestFrom } from "rxjs/operators";
import { getUser, login, requestCode, logout} from "../firebase/firebaseService";
import { AppEpic, AppState } from "../types/types";
import {
  ActionAuthLogIn,
  ActionAuthLogOut,
  authLoggedIn,
  authLoggedOut,
  authRequestCodeSuccess,
  AUTH_INIT,
  AUTH_LOG_IN,
  AUTH_LOG_OUT,
  AUTH_REQUEST_CODE
} from "./authActions";

export const authInitEpic: AppEpic = action$ =>
  action$.pipe(
    ofType(AUTH_INIT),
    mergeMap(() => getUser()),
    map(user => (user ? authLoggedIn(user) : authLoggedOut()))
  );

export const requestCodeEpic: AppEpic = action$ =>
  action$.pipe(
    ofType(AUTH_REQUEST_CODE),
    mergeMap((action: ActionAuthLogIn) => requestCode(action.payload).pipe(map(x => authRequestCodeSuccess(x))))
  );

export const loginEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(AUTH_LOG_IN),
    withLatestFrom(state$),
    mergeMap(([action, state]: [ActionAuthLogIn, AppState]) =>
      login(action.payload, state.auth.confirmationResult).pipe(map(x => authLoggedIn(x)))
    )
  );

export const logoutEpic: AppEpic = action$ =>
  action$.pipe(
    ofType(AUTH_LOG_OUT),
    mergeMap((action: ActionAuthLogOut) => logout().pipe(map(x => authLoggedOut())))
  );
