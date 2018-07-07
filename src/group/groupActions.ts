import { Group } from "../models/group";

export const GROUP_CREATE = "GROUP_CREATE";
export const GROUP_CREATE_SUCCESS = "GROUP_CREATE_SUCCESS";
export const GROUP_CREATE_ERROR = "GROUP_CREATE_ERROR";

export type TYPE_GROUP_CREATE = "GROUP_CREATE";
export type TYPE_GROUP_CREATE_SUCCESS = "GROUP_CREATE_SUCCESS";
export type TYPE_GROUP_CREATE_ERROR = "GROUP_CREATE_ERROR";

export type GroupCreate = {
  type: "GROUP_CREATE";
  payload: string;
};

export type GroupCreateSuccess = {
  type: "GROUP_CREATE_SUCCESS";
  payload: Group;
};

export type GroupCreateError = {
  type: "GROUP_CREATE_ERROR";
};

export type GroupActions = GroupCreate | GroupCreateSuccess | GroupCreateError;

export type GroupsActionTypes = TYPE_GROUP_CREATE | TYPE_GROUP_CREATE_SUCCESS | TYPE_GROUP_CREATE_ERROR;

export const createGroup = (name: string): GroupCreate => ({
  type: GROUP_CREATE,
  payload: name
});

export const createGroupSuccess = (group: Group): GroupCreateSuccess => ({
  type: GROUP_CREATE_SUCCESS,
  payload: group
});

export const createGroupError = (): GroupCreateError => ({
  type: GROUP_CREATE_ERROR
});
