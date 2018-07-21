import { combineEpics } from "redux-observable";
import {authInitEpic, loginEpic, logoutEpic, requestCodeEpic} from "../auth/authEpics";
import { handleEvents, requestFcmPermissionEpic, subscribeToEvents, updateFcmTokenEpic } from "../fcm/fcmEpics";
import { loadGroupsEpic } from "../groups/groupsEpics";
import { createMessageEpic, loadMessagesEpic } from "../messages/messagesEpics";
import { AppAction, AppState } from "../types/types";
import { loadUsersEpic } from "../users/usersEpics";
import { initRouterEpic, routerPushEpic, routerReplaceEpic, routerPopEpic } from "../router/routerEpics";

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
  loadUsersEpic,
  handleEvents,
  initRouterEpic,
  routerPushEpic,
  routerReplaceEpic,
  routerPopEpic
);
