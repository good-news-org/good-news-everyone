import { Group } from "../models/group";
import { AppActionP } from "../types/types";
import { createAction1 } from "../utils/utils";

export const GROUP_CREATE = "GROUP_CREATE";
export const GROUP_CREATE_SUCCESS = "GROUP_CREATE_SUCCESS";
export const GROUP_CREATE_ERROR = "GROUP_CREATE_ERROR";

export type GroupCreate = AppActionP<typeof GROUP_CREATE, string>;
export type GroupCreateSuccess = AppActionP<typeof GROUP_CREATE_SUCCESS, Group>;
export type GroupCreateError = AppActionP<typeof GROUP_CREATE_ERROR, any>;

export const createGroup = (name: string): GroupCreate => createAction1(GROUP_CREATE, name);
export const createGroupSuccess = (group: Group): GroupCreateSuccess => createAction1(GROUP_CREATE_SUCCESS, group);
export const createGroupError = (error: any): GroupCreateError => createAction1(GROUP_CREATE_ERROR, error);
