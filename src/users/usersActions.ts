import { User } from "../models/user";
import { AppActionP } from "../types/types";
import { createAction1 } from "../utils/utils";

export const USER_LOAD = "USER_LOAD";
export const USER_LOAD_SUCCESS = "USER_LOAD_SUCCESS";
export const USER_LOAD_ERROR = "USER_LOAD_ERROR";

export type UserLoad = AppActionP<typeof USER_LOAD, string>;
export type UsersLoadSuccess = AppActionP<typeof USER_LOAD_SUCCESS, User>;
export type UsersLoadError = AppActionP<typeof USER_LOAD_ERROR, { userId: string; error: object }>;

export const loadUser = (userId: string): UserLoad => createAction1(USER_LOAD, userId);
export const loadUserSuccess = (user: User): UsersLoadSuccess => createAction1(USER_LOAD_SUCCESS, user);
export const loadUserError = (userId: string, error: object): UsersLoadError =>
  createAction1(USER_LOAD_ERROR, { userId, error });
