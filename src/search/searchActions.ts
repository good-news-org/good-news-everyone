import { createAction, createAction1 } from "../utils/utils";
import { User } from "../models/user";

export const SEARCH_USER = "SEARCH_USER";
export const SEARCH_USER_SUCCESS = "SEARCH_USER_SUCCESS";
export const SEARCH_USER_ERROR = "SEARCH_USER_ERROR";

export type TYPE_SEARCH_USER = "SEARCH_USER";
export type TYPE_SEARCH_USER_SUCCESS = "SEARCH_USER_SUCCESS";
export type TYPE_SEARCH_USER_ERROR = "SEARCH_USER_ERROR";

export type SearchUser = {
  type: TYPE_SEARCH_USER;
  payload: string;
};

export type SearchUserSuccess = {
  type: TYPE_SEARCH_USER_SUCCESS;
  payload: Array<User>;
};

export type SearchUserError = {
  type: TYPE_SEARCH_USER_ERROR;
  payload: any;
};

export type SearchActions = SearchUser | SearchUserSuccess | SearchUserError;

export type SearchActionTypes = TYPE_SEARCH_USER | TYPE_SEARCH_USER_SUCCESS | TYPE_SEARCH_USER_ERROR;

export const searchUser = (query: string): SearchUser => ({
  type: SEARCH_USER,
  payload: query
});

export const searchUserSuccess = (users: Array<User>): SearchUserSuccess => ({
  type: SEARCH_USER_SUCCESS,
  payload: users
});

export const searchUserError = (error: any): SearchUserError => ({
  type: SEARCH_USER_ERROR,
  payload: error
});
