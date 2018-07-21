import { LOADING, success, error } from "../types/loadable";
import { StateReducer, StateReducers, UsersState } from "../types/types";
import { createReducer } from "../utils/utils";
import {
  UserLoad,
  UsersLoadError,
  UsersLoadSuccess,
  USER_LOAD,
  USER_LOAD_ERROR,
  USER_LOAD_SUCCESS
} from "./usersActions";

const initialState: UsersState = {
  users: {}
};

const usersLoad: StateReducer<UsersState, UserLoad> = (state, action) => ({
  users: {
    ...state.users,
    [action.payload]: LOADING
  }
});

const usersLoadSuccess: StateReducer<UsersState, UsersLoadSuccess> = (state, action) => ({
  users: {
    ...state.users,
    [action.payload.id]: success(action.payload)
  }
});

const usersLoadError: StateReducer<UsersState, UsersLoadError> = (state, action) => ({
  users: {
    ...state.users,
    [action.payload.userId]: error(action.payload.error)
  }
});

const handlers: StateReducers<UsersState> = {
  [USER_LOAD]: usersLoad,
  [USER_LOAD_SUCCESS]: usersLoadSuccess,
  [USER_LOAD_ERROR]: usersLoadError
};

export const usersReducer = createReducer(handlers, initialState);
