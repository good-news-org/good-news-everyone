import { ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, map, mergeMap, withLatestFrom } from "rxjs/operators";
import { loadGroups } from "../firebase/firebaseService";
import { AppEpic } from "../types/types";
import { GROUPS_LOAD, loadGroupsError, loadGroupsSuccess } from "./groupsActions";

export const loadGroupsEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(GROUPS_LOAD),
    withLatestFrom(state$),
    mergeMap(([_, state]) =>
      loadGroups(state.auth.user.uid).pipe(
        map(loadGroupsSuccess),
        catchError(x => of(loadGroupsError(x)))
      )
    )
  );
