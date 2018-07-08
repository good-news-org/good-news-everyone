import { ConfirmationResult } from "@firebase/auth-types";
import { AuthActions, AuthActionTypes } from "../auth/authActions";
import { FcmActions, FcmActionTypes } from "../fcm/fcmActions";
import { GroupsActions, GroupsActionTypes } from "../groups/groupsActions";
import { MessagesActions, MessagesActionTypes } from "../messages/messagesActions";
import { Group } from "../models/group";
import { Message } from "../models/message";
import { UsersActions, UsersActionTypes } from "../users/usersActions";
import { Observable } from "../../node_modules/rxjs";
import { User } from "../models/user";

export type AppAction = AuthActions | GroupsActions | MessagesActions | FcmActions | UsersActions;

export type AppActionType =
  | AuthActionTypes
  | GroupsActionTypes
  | MessagesActionTypes
  | FcmActionTypes
  | UsersActionTypes;

export type AppState = {
  auth: AuthState;
  groups: GroupsState;
  messages: MessagesState;
  users: UsersState;
};

export type AppEpic = (action$: Observable<AppAction>, state$: Observable<AppState>) => Observable<AppAction>;

export type AuthState = {
  initialized: boolean;
  user: firebase.User | undefined;
  confirmationResult: ConfirmationResult | undefined;
};

export type GroupsState = {
  groups: MapObject<Group>;
};

export type MessagesState = {
  messages: MapObject<Array<Message>>;
};

export type UsersState = {
  users: MapObject<User>;
};

export type StateReducer<S, A> = (state: S, action: A) => S;

export type StateReducers<T> = { [actionType in AppActionType]?: (state: T, action: AppAction) => T };

export type MapObject<T> = { [key: string]: T };
