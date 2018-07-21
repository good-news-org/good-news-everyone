import { GroupsState, StateReducer, StateReducers } from "../types/types";
import { GroupsLoadSuccess, GROUPS_LOAD_SUCCESS } from "./groupsActions";
import { createReducer } from "../utils/utils";
import { GroupLoadSuccess, GROUP_LOAD_SUCCESS, GROUP_ADD_MEMBER_SUCCESS, GroupAddMemberSuccess } from "../group/groupActions";

const initialState: GroupsState = {
  groups: {}
};

const groupsLoadSuccess: StateReducer<GroupsState, GroupsLoadSuccess> = (state, action) => ({
  ...state,
  groups: action.payload
});

const groupLoadSuccess: StateReducer<GroupsState, GroupLoadSuccess> = (state, action) => ({
  ...state,
  groups: {
    ...state.groups,
    [action.payload.id]: action.payload
  }
});

const groupAddMemberSuccess: StateReducer<GroupsState, GroupAddMemberSuccess> = (state, action) => ({
  ...state,
  groups: {
    ...state.groups,
    [action.payload.groupId]: {
      ...state.groups[action.payload.groupId],
      members: {
        ...state.groups[action.payload.groupId].members,
        [action.payload.userId]: {
          id: action.payload.userId,
          userId: action.payload.userId
        }
      }
    }
  }
});

const handlers: StateReducers<GroupsState> = {
  [GROUPS_LOAD_SUCCESS]: groupsLoadSuccess,
  [GROUP_LOAD_SUCCESS]: groupLoadSuccess,
  [GROUP_ADD_MEMBER_SUCCESS]: groupAddMemberSuccess
};

export const groupsReducer = createReducer(handlers, initialState);
