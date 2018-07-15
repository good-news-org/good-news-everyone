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
import { GroupActionTypes, GroupActions } from "../group/groupActions";
import { RouterActions, RouterActionTypes } from "../router/routerActions";

export type AppAction =
  | AuthActions
  | GroupsActions
  | GroupActions
  | MessagesActions
  | FcmActions
  | UsersActions
  | RouterActions;

export type AppActionType =
  | AuthActionTypes
  | GroupsActionTypes
  | GroupActionTypes
  | MessagesActionTypes
  | FcmActionTypes
  | UsersActionTypes
  | RouterActionTypes;

export type AppState = {
  auth: AuthState;
  groups: GroupsState;
  messages: MessagesState;
  users: UsersState;
  router: RouterState;
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

export type RouterState = {
  location: string;
  params: {
    [key: string]: any;
  };
};

export type UsersState = {
  users: MapObject<User>;
};

export type StateReducer<S, A> = (state: S, action: A) => S;

export type StateReducers<T> = { [actionType in AppActionType]?: (state: T, action: AppAction) => T };

export type MapObject<T> = { [key: string]: T };
