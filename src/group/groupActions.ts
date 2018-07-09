import { Group } from "../models/group";
import { createAction, createAction1 } from "../utils/utils";

export const GROUP_CREATE = "GROUP_CREATE";
export const GROUP_CREATE_SUCCESS = "GROUP_CREATE_SUCCESS";
export const GROUP_CREATE_ERROR = "GROUP_CREATE_ERROR";

export type TYPE_GROUP_CREATE = "GROUP_CREATE";
export type TYPE_GROUP_CREATE_SUCCESS = "GROUP_CREATE_SUCCESS";
export type TYPE_GROUP_CREATE_ERROR = "GROUP_CREATE_ERROR";

export type GroupCreate = {
  type: TYPE_GROUP_CREATE;
  payload: string;
};

export type GroupCreateSuccess = {
  type: TYPE_GROUP_CREATE_SUCCESS;
  payload: Group;
};

export type GroupCreateError = {
  type: TYPE_GROUP_CREATE_ERROR;
};

export type GroupActions = GroupCreate | GroupCreateSuccess | GroupCreateError;

export type GroupActionTypes = TYPE_GROUP_CREATE | TYPE_GROUP_CREATE_SUCCESS | TYPE_GROUP_CREATE_ERROR;

export const createGroup = createAction1<GroupCreate, Group>(GROUP_CREATE);

export const createGroupSuccess = createAction1<GroupCreateSuccess, Group>(GROUP_CREATE_SUCCESS);

export const createGroupError = createAction<GroupCreateError>(GROUP_CREATE_ERROR);
