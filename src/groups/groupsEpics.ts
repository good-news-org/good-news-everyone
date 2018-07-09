import { ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { loadGroups } from "../firebase/firebaseService";
import { AppEpic } from "../types/types";
import { GROUPS_LOAD, loadGroupsError, loadGroupsSuccess } from "./groupsActions";

export const loadGroupsEpic: AppEpic = action$ =>
  action$.pipe(
    ofType(GROUPS_LOAD),
    mergeMap(() =>
      loadGroups("asd").pipe(
        map(loadGroupsSuccess),
        catchError(x => of(loadGroupsError()))
      )
    )
  );
