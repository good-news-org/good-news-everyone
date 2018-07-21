import { StateReducer, StateReducers, UsersState } from "../types/types";
import { createReducer } from "../utils/utils";
import { UsersLoadSuccess, USER_LOAD_SUCCESS } from "./usersActions";

const initialState: UsersState = {
  users: {}
};

const usersLoadSuccess: StateReducer<UsersState, UsersLoadSuccess> = (state, action) => ({
  users: {
    ...state.users,
    [action.payload.id]: action.payload
  }
});

const handlers: StateReducers<UsersState> = {
  [USER_LOAD_SUCCESS]: usersLoadSuccess
};

export const usersReducer = createReducer(handlers, initialState);
