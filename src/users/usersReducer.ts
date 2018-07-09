import { set } from "immutadot";
import { UsersState, StateReducers, StateReducer } from "../types/types";
import { UsersLoadSuccess, USERS_LOAD_SUCCESS } from "./usersActions";
import { createReducer } from "../utils/utils";

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
  [USERS_LOAD_SUCCESS]: usersLoadSuccess
};

export const usersReducer = createReducer(handlers, initialState);
