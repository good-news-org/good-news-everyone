import { ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import { map, mergeMap, onErrorResumeNext, catchError } from "rxjs/operators";
import { loadGroups } from "../firebase/firebaseService";
import { AppAction } from "../types/types";
import { GROUPS_LOAD, loadGroupsError, loadGroupsSuccess } from "./groupsActions";

export const loadGroupsEpic = (action$: Observable<AppAction>) =>
  action$.pipe(
    ofType(GROUPS_LOAD),
    mergeMap(() =>
      loadGroups("asd").pipe(
        map(loadGroupsSuccess),
        catchError(x => of(loadGroupsError()))
      )
    )
  );
