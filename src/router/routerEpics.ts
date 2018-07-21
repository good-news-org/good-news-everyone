import { ofType } from "redux-observable";
import { EMPTY, Observable } from "rxjs";
import { map, mergeMap, take } from "rxjs/operators";
import { AppEpic } from "../types/types";
import {
  RouterInit,
  routerNavigate,
  RouterPush,
  ROUTER_INIT,
  ROUTER_PUSH,
  ROUTER_REPLACE,
  ROUTER_POP,
  RouterPop,
  RouterReplace
} from "./routerActions";

const getHistoryObserver = (): Observable<string> =>
  Observable.create(observer => {
    window.onpopstate = () => observer.next(document.location.pathname);
  });

export const initRouterEpic: AppEpic = action$ =>
  action$.pipe(
    ofType<RouterInit>(ROUTER_INIT),
    take(1),
    mergeMap(() => getHistoryObserver().pipe(map((path: string) => routerNavigate(path))))
  );

export const routerPushEpic: AppEpic = action$ =>
  action$.pipe(
    ofType<RouterPush>(ROUTER_PUSH),
    mergeMap(action => {
      window.history.pushState({}, null, action.payload);
      return EMPTY;
    })
  );

export const routerReplaceEpic: AppEpic = action$ =>
  action$.pipe(
    ofType<RouterReplace>(ROUTER_REPLACE),
    mergeMap(action => {
      window.history.replaceState({}, null, action.payload);
      return EMPTY;
    })
  );

export const routerPopEpic: AppEpic = action$ =>
  action$.pipe(
    ofType<RouterPop>(ROUTER_POP),
    mergeMap(() => {
      window.history.back();
      return EMPTY;
    })
  );
