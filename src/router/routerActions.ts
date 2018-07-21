import { createAction, createAction1 } from "../utils/utils";

export const ROUTER_INIT = "ROUTER_INIT";
export const ROUTER_PUSH = "ROUTER_PUSH";
export const ROUTER_POP = "ROUTER_POP";
export const ROUTER_REPLACE = "ROUTER_REPLACE";
export const ROUTER_NAVIGATE = "ROUTER_NAVIGATE";

export type TYPE_ROUTER_INIT = "ROUTER_INIT";
export type TYPE_ROUTER_PUSH = "ROUTER_PUSH";
export type TYPE_ROUTER_POP = "ROUTER_POP";
export type TYPE_ROUTER_REPLACE = "ROUTER_REPLACE";
export type TYPE_ROUTER_NAVIGATE = "ROUTER_NAVIGATE";

export type RouterInit = {
  type: TYPE_ROUTER_INIT;
};

export type RouterPush = {
  type: TYPE_ROUTER_PUSH;
  payload: string;
};

export type RouterPop = {
  type: TYPE_ROUTER_POP;
};

export type RouterReplace = {
  type: TYPE_ROUTER_REPLACE;
  payload: string;
};

export type RouterNavigate = {
  type: TYPE_ROUTER_NAVIGATE;
  payload: string;
};

export type RouterActions = RouterInit | RouterPush | RouterPop | RouterReplace | RouterNavigate;

export type RouterActionTypes =
  | TYPE_ROUTER_INIT
  | TYPE_ROUTER_PUSH
  | TYPE_ROUTER_POP
  | TYPE_ROUTER_REPLACE
  | TYPE_ROUTER_NAVIGATE;

export const routerInit = createAction<RouterInit>(ROUTER_INIT);

export const routerPush = createAction1<RouterPush, string>(ROUTER_PUSH);

export const routerPop = createAction<RouterPop>(ROUTER_POP);

export const routerReplace = (path: string): RouterReplace => ({
  type: ROUTER_REPLACE,
  payload: path
});

export const routerNavigate = (path: string): RouterNavigate => ({
  type: ROUTER_NAVIGATE,
  payload: path
});
