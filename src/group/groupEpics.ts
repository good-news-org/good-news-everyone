import { ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, map, mergeMap, withLatestFrom } from "rxjs/operators";
import { createGroup, loadGroup, addMember } from "../firebase/firebaseService";
import { AppEpic } from "../types/types";
import {
  createGroupError,
  createGroupSuccess,
  GroupCreate,
  GROUP_CREATE,
  GROUP_LOAD,
  GroupLoad,
  loadGroupError,
  loadGroupSuccess,
  GroupAddMember,
  GROUP_ADD_MEMBER,
  addMemberSuccess,
  addMemberError
} from "./groupActions";
import { routerReplace } from "../router/routerActions";

export const createGroupEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType<GroupCreate>(GROUP_CREATE),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      createGroup(state.auth.user.uid, action.payload).pipe(
        mergeMap(group => of(createGroupSuccess(group), routerReplace(`invite/${group.id}`))),
        catchError(x => console.log(x) || of(createGroupError(x)))
      )
    )
  );

export const loadGroupEpic: AppEpic = action$ =>
  action$.pipe(
    ofType<GroupLoad>(GROUP_LOAD),
    mergeMap(action =>
      loadGroup(action.payload).pipe(
        map(group => loadGroupSuccess(group)),
        catchError(x => console.log(x) || of(loadGroupError(x)))
      )
    )
  );

export const addMemberEpic: AppEpic = action$ =>
  action$.pipe(
    ofType<GroupAddMember>(GROUP_ADD_MEMBER),
    mergeMap(action =>
      addMember(action.payload.groupId, action.payload.userId).pipe(
        map(group => addMemberSuccess(action.payload.groupId, action.payload.userId)),
        catchError(x => console.log(x) || of(addMemberError(x)))
      )
    )
  );
