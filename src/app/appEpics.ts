import { combineEpics } from "redux-observable";
import { loginEpic, requestCodeEpic, authInitEpic } from "../auth/authEpics";
import { AppAction, AppState } from "../types/types";
import { loadGroupsEpic } from "../groups/groupsEpics";
import { getFcmTokenEpic, requestFcmPermissionEpic, updateFcmTokenEpic, subscribeToEvents, handleEvents } from "../fcm/fcmEpics";
import { loadMessagesEpic, createMessageEpic } from "../messages/messagesEpics";

export const appEpics = combineEpics<AppAction, AppAction, AppState>(
  authInitEpic,
  loginEpic,
  requestCodeEpic,
  loadGroupsEpic,
  loadMessagesEpic,
  createMessageEpic,
  updateFcmTokenEpic,
  getFcmTokenEpic,
  requestFcmPermissionEpic,
  subscribeToEvents,
  handleEvents
);
