import { ConfirmationResult } from "@firebase/auth-types";
import { User } from "firebase";
import { AuthActions, AuthActionTypes } from "../auth/authActions";
import { FcmActions, FcmActionTypes } from "../fcm/fcmActions";
import { GroupsActions, GroupsActionTypes } from "../groups/groupsActions";
import { MessagesActions, MessagesActionTypes } from "../messages/messagesActions";
import { Group } from "../models/group";
import { Message } from "../models/message";

export type AppAction = AuthActions | GroupsActions | MessagesActions | FcmActions;

export type AppActionType = AuthActionTypes | GroupsActionTypes | MessagesActionTypes | FcmActionTypes;

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

export type StateReducer<S, A> = (state: S, action: A) => S;

export type StateReducers<T> = { [actionType in AppActionType]?: (state: T, action: AppAction) => T };

export type MapObject<T> = { [key: string]: T };
