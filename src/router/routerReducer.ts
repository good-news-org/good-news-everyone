import { RouterState, StateReducer, StateReducers } from "../types/types";
import { createReducer } from "../utils/utils";
import {
  RouterNavigate,
  RouterPush,
  RouterReplace,
  ROUTER_NAVIGATE,
  ROUTER_PUSH,
  ROUTER_REPLACE
} from "./routerActions";

const initialState: RouterState = {
  location: "/",
  params: {}
};

const routerPush: StateReducer<RouterState, RouterPush> = (state, action) => ({
  ...state,
  location: action.payload
});

const routerNavigate: StateReducer<RouterState, RouterNavigate> = (state, action) => ({
  ...state,
  location: action.payload
});

const routerReplace: StateReducer<RouterState, RouterReplace> = (state, action) => ({
  ...state,
  location: action.payload
});

const handlers: StateReducers<RouterState> = {
  [ROUTER_PUSH]: routerPush,
  [ROUTER_NAVIGATE]: routerNavigate,
  [ROUTER_REPLACE]: routerReplace
};

export const routerReducer = createReducer(handlers, initialState);
