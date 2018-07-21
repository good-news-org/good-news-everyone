import { combineEpics } from "redux-observable";
import {authInitEpic, loginEpic, logoutEpic, requestCodeEpic} from "../auth/authEpics";
import { handleEvents, requestFcmPermissionEpic, subscribeToEvents, updateFcmTokenEpic } from "../fcm/fcmEpics";
import { loadGroupsEpic } from "../groups/groupsEpics";
import { createMessageEpic, loadMessagesEpic } from "../messages/messagesEpics";
import { AppAction, AppState } from "../types/types";
import { loadUsersEpic } from "../users/usersEpics";
import { initRouterEpic, routerPushEpic, routerReplaceEpic, routerPopEpic } from "../router/routerEpics";
import { userSearchEpic } from "../search/searchEpics";
import { createGroupEpic, loadGroupEpic, addMemberEpic } from "../group/groupEpics";

export const appEpics = combineEpics<AppAction<any>, AppAction<any>, AppState>(
  authInitEpic,
  loginEpic,
  logoutEpic,
  requestCodeEpic,
  loadGroupsEpic,
  loadMessagesEpic,
  createMessageEpic,
  updateFcmTokenEpic,
  requestFcmPermissionEpic,
  subscribeToEvents,
  userSearchEpic,
  loadUsersEpic,
  handleEvents,
  createGroupEpic,
  loadGroupEpic,
  addMemberEpic,
  initRouterEpic,
  routerPushEpic,
  routerReplaceEpic,
  routerPopEpic
);
