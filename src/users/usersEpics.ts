import { ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { loadUser } from "../firebase/firebaseService";
import { AppAction } from "../types/types";
import {
  loadUserError,
  loadUserSuccess,
  UserLoad,
  USER_LOAD,
} from "./usersActions";

export const loadUsersEpic = (action$: Observable<AppAction>) =>
  action$.pipe(
    ofType<UserLoad>(USER_LOAD),
    mergeMap(action =>
      loadUser(action.payload).pipe(
        map(x => loadUserSuccess(x)),
        catchError(x => of(loadUserError()))
      )
    )
  );
