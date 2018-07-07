import { Group } from "../models/group";
import { MapObject } from "../types/types";

export const GROUPS_LOAD = "GROUPS_LOAD";
export const GROUPS_LOAD_SUCCESS = "GROUPS_LOAD_SUCCESS";
export const GROUPS_LOAD_ERROR = "GROUPS_LOAD_ERROR";

export type TYPE_GROUPS_LOAD = "GROUPS_LOAD";
export type TYPE_GROUPS_LOAD_SUCCESS = "GROUPS_LOAD_SUCCESS";
export type TYPE_GROUPS_LOAD_ERROR = "GROUPS_LOAD_ERROR";

export type GroupsLoad = {
  type: TYPE_GROUPS_LOAD;
};

export type GroupsLoadSuccess = {
  type: TYPE_GROUPS_LOAD_SUCCESS;
  payload: MapObject<Group>;
};

export type GroupsLoadError = {
  type: TYPE_GROUPS_LOAD_ERROR;
};

export type GroupsActions = GroupsLoad | GroupsLoadSuccess | GroupsLoadError;

export type GroupsActionTypes = TYPE_GROUPS_LOAD | TYPE_GROUPS_LOAD_SUCCESS | TYPE_GROUPS_LOAD_ERROR;

export const loadGroups = (): GroupsLoad => ({
  type: GROUPS_LOAD
});

export const loadGroupsSuccess = (groups: MapObject<Group>): GroupsLoadSuccess => ({
  type: GROUPS_LOAD_SUCCESS,
  payload: groups
});

export const loadGroupsError = (): GroupsLoadError => ({
  type: GROUPS_LOAD_ERROR
});
