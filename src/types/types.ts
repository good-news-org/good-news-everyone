import {
  ActionAuthInit,
  ActionAuthLoggedIn,
  ActionAuthLoggedOut,
  ActionAuthRequestCodeSuccess
} from "../auth/authActions";
import { User } from "firebase";
import { ConfirmationResult } from "@firebase/auth-types";
import { Group } from "../models/group";
import { GroupsActions, GroupsActionTypes } from "../groups/groupsActions";
import { FcmActions, FcmActionTypes } from "../fcm/fcmActions";
import { MessagesActions, MessagesActionTypes } from "../messages/messagesActions";
import { Message } from "../models/message";

interface SomeAction {
  type: string;
}

export type AppAction =
  | SomeAction
  | ActionAuthInit
  | ActionAuthRequestCodeSuccess
  | ActionAuthLoggedIn
  | ActionAuthLoggedOut
  | GroupsActions
  | MessagesActions
  | FcmActions;

export type AppActionType = GroupsActionTypes | MessagesActionTypes | FcmActionTypes;

export type AppState = {
  auth: AuthState;
  groups: GroupsState;
  messages: MessagesState;
};

export type AuthState = {
  initialized: boolean;
  user: User | undefined;
  confirmationResult: ConfirmationResult | undefined;
};

export type GroupsState = {
  groups: MapObject<Group>;
};

export type MessagesState = {
  messages: MapObject<Array<Message>>;
};

export type AuthStateReducer = (state: AuthState, action: AppAction) => AuthState;

export type GroupsStateReducer = (state: GroupsState, action: AppAction) => GroupsState;

export type StateReducer<T> = (state: T, action: AppAction) => T;

export type MapObject<T> = { [key: string]: T };
