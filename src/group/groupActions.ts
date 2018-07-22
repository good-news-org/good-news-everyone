import { Group } from "../models/group";
import { AppActionP } from "../types/types";
import { createAction1 } from "../utils/utils";

export const GROUP_LOAD = "GROUP_LOAD";
export const GROUP_LOAD_SUCCESS = "GROUP_LOAD_SUCCESS";
export const GROUP_LOAD_ERROR = "GROUP_LOAD_ERROR";

export const GROUP_CREATE = "GROUP_CREATE";
export const GROUP_CREATE_SUCCESS = "GROUP_CREATE_SUCCESS";
export const GROUP_CREATE_ERROR = "GROUP_CREATE_ERROR";

export const GROUP_ADD_MEMBER = "GROUP_ADD_MEMBER";
export const GROUP_ADD_MEMBER_SUCCESS = "GROUP_ADD_MEMBER_SUCCESS";
export const GROUP_ADD_MEMBER_ERROR = "GROUP_ADD_MEMBER_ERROR";

export type GroupLoad = AppActionP<typeof GROUP_LOAD, string>;
export type GroupLoadSuccess = AppActionP<typeof GROUP_LOAD_SUCCESS, Group>;
export type GroupLoadError = AppActionP<typeof GROUP_LOAD_ERROR, any>;
export type GroupAddMember = AppActionP<
  typeof GROUP_ADD_MEMBER,
  {
    groupId: string;
    userId: string;
  }
>;
export type GroupAddMemberSuccess = AppActionP<
  typeof GROUP_ADD_MEMBER_SUCCESS,
  {
    groupId: string;
    userId: string;
  }
>;
export type GroupAddMemberError = AppActionP<typeof GROUP_ADD_MEMBER_ERROR, any>;
export type GroupCreate = AppActionP<typeof GROUP_CREATE, string>;
export type GroupCreateSuccess = AppActionP<typeof GROUP_CREATE_SUCCESS, Group>;
export type GroupCreateError = AppActionP<typeof GROUP_CREATE_ERROR, any>;

export const loadGroup = (groupId: string): GroupLoad => createAction1(GROUP_LOAD, groupId);
export const loadGroupSuccess = (group: Group): GroupLoadSuccess => createAction1(GROUP_LOAD_SUCCESS, group);
export const loadGroupError = (error: any): GroupLoadError => createAction1(GROUP_LOAD_ERROR, error);
export const addMember = (groupId: string, userId: string): GroupAddMember =>
  createAction1(GROUP_ADD_MEMBER, { groupId, userId });
export const addMemberSuccess = (groupId: string, userId: string): GroupAddMemberSuccess =>
  createAction1(GROUP_ADD_MEMBER_SUCCESS, { groupId, userId });
export const addMemberError = (error: any): GroupAddMemberError => createAction1(GROUP_ADD_MEMBER_ERROR, error);
export const createGroup = (name: string): GroupCreate => createAction1(GROUP_CREATE, name);
export const createGroupSuccess = (group: Group): GroupCreateSuccess => createAction1(GROUP_CREATE_SUCCESS, group);
export const createGroupError = (error: any): GroupCreateError => createAction1(GROUP_CREATE_ERROR, error);
