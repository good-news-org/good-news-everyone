import { ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, map, switchMap, debounceTime } from "rxjs/operators";
import { searchUser } from "../firebase/firebaseService";
import { AppEpic } from "../types/types";
import { SearchUser, searchUserError, searchUserSuccess, SEARCH_USER } from "./searchActions";

export const userSearchEpic: AppEpic = action$ =>
  action$.pipe(
    ofType<SearchUser>(SEARCH_USER),
    debounceTime(200),
    switchMap(action =>
      searchUser(action.payload).pipe(
        map(searchUserSuccess),
        catchError(error => of(searchUserError(error)))
      )
    )
  );
