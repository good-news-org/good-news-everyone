import { User } from "../models/user";

export const USER_LOAD = "USER_LOAD";
export const USERS_LOAD_SUCCESS = "USER_LOAD_SUCCESS";
export const USERS_LOAD_ERROR = "USER_LOAD_ERROR";

export type TYPE_USER_LOAD = "USER_LOAD";
export type TYPE_USER_LOAD_SUCCESS = "USER_LOAD_SUCCESS";
export type TYPE_USER_LOAD_ERROR = "USER_LOAD_ERROR";

export type UserLoad = {
  type: TYPE_USER_LOAD;
  payload: string;
};

export type UsersLoadSuccess = {
  type: TYPE_USER_LOAD_SUCCESS;
  payload: User;
};

export type UsersLoadError = {
  type: TYPE_USER_LOAD_ERROR;
};

export type UsersActions = UserLoad | UsersLoadSuccess | UsersLoadError;

export type UsersActionTypes = TYPE_USER_LOAD | TYPE_USER_LOAD_SUCCESS | TYPE_USER_LOAD_ERROR;

export const loadUser = (userId: string): UserLoad => ({
  type: USER_LOAD,
  payload: userId
});

export const loadUserSuccess = (user: User): UsersLoadSuccess => ({
  type: USERS_LOAD_SUCCESS,
  payload: user
});

export const loadUserError = (): UsersLoadError => ({
  type: USERS_LOAD_ERROR
});
