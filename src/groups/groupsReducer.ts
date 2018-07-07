import { GroupsState, StateReducer, StateReducers } from "../types/types";
import { GroupsLoadSuccess, GROUPS_LOAD_SUCCESS } from "./groupsActions";
import { createReducer } from "../utils/utils";

const initialState: GroupsState = {
  groups: {}
};

const groupsLoadSuccess: StateReducer<GroupsState, GroupsLoadSuccess> = (state, action) => ({
  ...state,
  groups: action.payload
});

const handlers: StateReducers<GroupsState> = {
  [GROUPS_LOAD_SUCCESS]: groupsLoadSuccess
};

export const groupsReducer = createReducer(handlers, initialState);
