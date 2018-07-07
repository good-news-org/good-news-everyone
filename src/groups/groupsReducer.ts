import { AppAction, GroupsState, GroupsStateReducer, AppActionType } from "../types/types";
import { GROUPS_LOAD_SUCCESS, GroupsLoadSuccess } from "./groupsActions";

const initialState: GroupsState = {  
  groups: {}
};

const groupsLoadSuccess = (state: GroupsState, action: GroupsLoadSuccess) => ({
  ...state,
  groups: action.payload
});

const handlers: { [t in AppActionType]?: GroupsStateReducer } = {
  [GROUPS_LOAD_SUCCESS]: groupsLoadSuccess
};

export const groupsReducer = (state: GroupsState = initialState, action: AppAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;
