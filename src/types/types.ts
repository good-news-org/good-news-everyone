import { ConfirmationResult } from "@firebase/auth-types";
import { Observable } from "../../node_modules/rxjs";
import { Group } from "../models/group";
import { Message } from "../models/message";
import { User } from "../models/user";
import { Loadable } from "./loadable";

export interface AppAction<T extends string> {
  type: T;
}

export interface AppActionP<T extends string, P> extends AppAction<T> {
  payload: P;
}

export type AppState = {
  auth: AuthState;
  groups: GroupsState;
  messages: MessagesState;
  users: UsersState;
  router: RouterState;
  search: SearchState;
};

export type AppEpic = (action$: Observable<AppAction<any>>, state$: Observable<AppState>) => Observable<AppAction<any>>;

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

export type SearchState = {
  query: string;
  searching: boolean;
  results: Array<User>;
};

export type UsersState = {
  users: MapObject<Loadable<User>>;
};

export type StateReducer<S, A> = (state: S, action: A) => S;

export type StateReducers<T> = { [actionType: string]: (state: T, action: AppAction<any>) => T };

export type MapObject<T> = { [key: string]: T };
