import { Group } from "../models/group";
import { MapObject, AppAction, AppActionP } from "../types/types";
import { createAction, createAction1 } from "../utils/utils";

export const GROUPS_LOAD = "GROUPS_LOAD";
export const GROUPS_LOAD_SUCCESS = "GROUPS_LOAD_SUCCESS";
export const GROUPS_LOAD_ERROR = "GROUPS_LOAD_ERROR";

export type GroupsLoad = AppAction<typeof GROUPS_LOAD>;
export type GroupsLoadSuccess = AppActionP<typeof GROUPS_LOAD_SUCCESS, MapObject<Group>>;
export type GroupsLoadError = AppActionP<typeof GROUPS_LOAD_ERROR, string>;

export const loadGroups = (): GroupsLoad => createAction(GROUPS_LOAD);
export const loadGroupsSuccess = (groups: MapObject<Group>): GroupsLoadSuccess =>
  createAction1(GROUPS_LOAD_SUCCESS, groups);
export const loadGroupsError = (error: any): GroupsLoadError => createAction1(GROUPS_LOAD_ERROR, error);
