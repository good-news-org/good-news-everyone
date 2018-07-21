import { Group } from "../models/group";

export const GROUP_LOAD = "GROUP_LOAD";
export const GROUP_LOAD_SUCCESS = "GROUP_LOAD_SUCCESS";
export const GROUP_LOAD_ERROR = "GROUP_LOAD_ERROR";

export const GROUP_CREATE = "GROUP_CREATE";
export const GROUP_CREATE_SUCCESS = "GROUP_CREATE_SUCCESS";
export const GROUP_CREATE_ERROR = "GROUP_CREATE_ERROR";

export const GROUP_ADD_MEMBER = "GROUP_ADD_MEMBER";
export const GROUP_ADD_MEMBER_SUCCESS = "GROUP_ADD_MEMBER_SUCCESS";
export const GROUP_ADD_MEMBER_ERROR = "GROUP_ADD_MEMBER_ERROR";

export type TYPE_GROUP_LOAD = "GROUP_LOAD";
export type TYPE_GROUP_LOAD_SUCCESS = "GROUP_LOAD_SUCCESS";
export type TYPE_GROUP_LOAD_ERROR = "GROUP_LOAD_ERROR";

export type TYPE_GROUP_CREATE = "GROUP_CREATE";
export type TYPE_GROUP_CREATE_SUCCESS = "GROUP_CREATE_SUCCESS";
export type TYPE_GROUP_CREATE_ERROR = "GROUP_CREATE_ERROR";

export type TYPE_GROUP_ADD_MEMBER = "GROUP_ADD_MEMBER";
export type TYPE_GROUP_ADD_MEMBER_SUCCESS = "GROUP_ADD_MEMBER_SUCCESS";
export type TYPE_GROUP_ADD_MEMBER_ERROR = "GROUP_ADD_MEMBER_ERROR";

export type GroupLoad = {
  type: TYPE_GROUP_LOAD;
  payload: string;
};

export type GroupLoadSuccess = {
  type: TYPE_GROUP_LOAD_SUCCESS;
  payload: Group;
};

export type GroupLoadError = {
  type: TYPE_GROUP_LOAD_ERROR;
};

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

export type GroupAddMember = {
  type: TYPE_GROUP_ADD_MEMBER;
  payload: {
    groupId: string;
    userId: string;
  };
};

export type GroupAddMemberSuccess = {
  type: TYPE_GROUP_ADD_MEMBER_SUCCESS;
  payload: {
    groupId: string;
    userId: string;
  };
};

export type GroupAddMemberError = {
  type: TYPE_GROUP_ADD_MEMBER_ERROR;
  payload: any;
};

export type GroupActions =
  | GroupLoad
  | GroupLoadSuccess
  | GroupLoadError
  | GroupCreate
  | GroupCreateSuccess
  | GroupCreateError
  | GroupAddMember
  | GroupAddMemberSuccess
  | GroupAddMemberError;

export type GroupActionTypes =
  | TYPE_GROUP_LOAD
  | TYPE_GROUP_LOAD_SUCCESS
  | TYPE_GROUP_LOAD_ERROR
  | TYPE_GROUP_CREATE
  | TYPE_GROUP_CREATE_SUCCESS
  | TYPE_GROUP_CREATE_ERROR
  | TYPE_GROUP_ADD_MEMBER
  | TYPE_GROUP_ADD_MEMBER_SUCCESS
  | TYPE_GROUP_ADD_MEMBER_ERROR;

export const loadGroup = (groupId: string): GroupLoad => ({
  type: GROUP_LOAD,
  payload: groupId
});

export const loadGroupSuccess = (group: Group): GroupLoadSuccess => ({
  type: GROUP_LOAD_SUCCESS,
  payload: group
});

export const loadGroupError = (error: any): GroupLoadError => ({
  type: GROUP_LOAD_ERROR
});

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

export const addMember = (groupId: string, userId: string): GroupAddMember => ({
  type: GROUP_ADD_MEMBER,
  payload: { groupId, userId }
});

export const addMemberSuccess = (groupId: string, userId: string): GroupAddMemberSuccess => ({
  type: GROUP_ADD_MEMBER_SUCCESS,
  payload: { groupId, userId }
});

export const addMemberError = (error: any): GroupAddMemberError => ({
  type: GROUP_ADD_MEMBER_ERROR,
  payload: error
});
