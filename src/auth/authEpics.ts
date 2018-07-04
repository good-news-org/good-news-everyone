import { Observable } from "rxjs";
import { mergeMap, withLatestFrom, map } from "rxjs/operators";
import { ofType, StateObservable } from "redux-observable";
import {
  AUTH_LOG_IN,
  ActionAuthLogIn,
  AUTH_REQUEST_CODE,
  authRequestCodeSuccess,
  authLoggedIn,
  AUTH_INIT,
  authLoggedOut
} from "../auth/authActions";
import { requestCode, login, getUser } from "../firebase/firebaseService";
import { AppState, Action } from "../types/types";

export const authInitEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(AUTH_INIT),
    mergeMap(() => getUser()),
    map(user => (user ? authLoggedIn(user) : authLoggedOut()))
  );

export const requestCodeEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(AUTH_REQUEST_CODE),
    mergeMap((action: ActionAuthLogIn) => requestCode(action.payload).pipe(map(x => authRequestCodeSuccess(x))))
  );

export const loginEpic = (action$: Observable<Action>, state$: StateObservable<AppState>) =>
  action$.pipe(
    ofType(AUTH_LOG_IN),
    withLatestFrom(state$),
    mergeMap(([action, state]: [ActionAuthLogIn, AppState]) =>
      login(action.payload, state.auth.confirmationResult).pipe(map(x => authLoggedIn(x)))
    )
  );
