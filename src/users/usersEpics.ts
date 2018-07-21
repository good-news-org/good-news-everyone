import { ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { loadUser } from "../firebase/firebaseService";
import { AppEpic } from "../types/types";
import { loadUserError, loadUserSuccess, UserLoad, USER_LOAD } from "./usersActions";

export const loadUsersEpic: AppEpic = action$ =>
  action$.pipe(
    ofType<UserLoad>(USER_LOAD),
    mergeMap(action =>
      loadUser(action.payload).pipe(
        map(x => loadUserSuccess(x)),
        catchError(x => console.log(x) || of(loadUserError(x)))
      )
    )
  );
