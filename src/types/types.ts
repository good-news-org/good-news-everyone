import {
  ActionAuthInit,
  ActionAuthLoggedIn,
  ActionAuthLoggedOut,
  ActionAuthRequestCodeSuccess
} from "../auth/authActions";
import { User } from "firebase";
import { ConfirmationResult } from "@firebase/auth-types";

interface SomeAction {
  type: string;
}

export type Action =
  | SomeAction
  | ActionAuthInit
  | ActionAuthRequestCodeSuccess
  | ActionAuthLoggedIn
  | ActionAuthLoggedOut;

export type AppState = {
  auth: AuthState;
};

export type AuthState = {
  initialized: boolean;
  user: User | undefined;
  confirmationResult: ConfirmationResult | undefined;
};

export type AppStateReducer = (state: AuthState, action: Action) => AuthState;
