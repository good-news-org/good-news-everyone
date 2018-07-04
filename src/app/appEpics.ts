import { combineEpics } from "redux-observable";
import { loginEpic, requestCodeEpic, authInitEpic } from "../auth/authEpics";
import { Action, AppState } from "../types/types";

export const appEpics = combineEpics<Action, Action, AppState>(authInitEpic, loginEpic, requestCodeEpic);
