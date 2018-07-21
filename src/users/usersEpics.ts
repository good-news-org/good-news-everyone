import { ofType } from "redux-observable";
import { of, EMPTY } from "rxjs";
import { catchError, map, mergeMap, withLatestFrom } from "rxjs/operators";
import { loadUser } from "../firebase/firebaseService";
import { AppEpic } from "../types/types";
import { loadUserError, loadUserSuccess, UserLoad, USER_LOAD, USER_LOAD_ERROR } from "./usersActions";

export const loadUsersEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType<UserLoad>(USER_LOAD),
    mergeMap(action =>
      loadUser(action.payload).pipe(
        map(x => (x ? loadUserSuccess(x) : loadUserError(action.payload, { message: "NOT FOUND" }))),
        catchError(x => console.log(x) || of(loadUserError(action.payload, x)))
      )
    )
  );
