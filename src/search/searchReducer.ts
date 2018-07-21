import { SearchState, StateReducer, StateReducers } from "../types/types";
import { createReducer } from "../utils/utils";
import {
  SearchUserSuccess,
  SEARCH_USER_SUCCESS,
  SearchUser,
  SearchUserError,
  SEARCH_USER,
  SEARCH_USER_ERROR
} from "./searchActions";

const initialState: SearchState = {
  query: "/",
  searching: false,
  results: []
};

const searchUser: StateReducer<SearchState, SearchUserSuccess> = (state, action) => ({
  ...state,
  searching: true
});

const searchUserSuccess: StateReducer<SearchState, SearchUserSuccess> = (state, action) => ({
  ...state,
  results: action.payload,
  searching: false
});

const searchUserError: StateReducer<SearchState, SearchUserError> = (state, action) => ({
  ...state,
  searching: false
});

const handlers: StateReducers<SearchState> = {
  [SEARCH_USER]: searchUser,
  [SEARCH_USER_SUCCESS]: searchUserSuccess,
  [SEARCH_USER_ERROR]: searchUserError
};

export const searchReducer = createReducer(handlers, initialState);
