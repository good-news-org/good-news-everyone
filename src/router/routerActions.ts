import { createAction, createAction1 } from "../utils/utils";
import { AppAction, AppActionP } from "../types/types";

export const ROUTER_INIT = "ROUTER_INIT";
export const ROUTER_PUSH = "ROUTER_PUSH";
export const ROUTER_POP = "ROUTER_POP";
export const ROUTER_REPLACE = "ROUTER_REPLACE";
export const ROUTER_NAVIGATE = "ROUTER_NAVIGATE";

export type RouterInit = AppAction<typeof ROUTER_INIT>;
export type RouterPush = AppActionP<typeof ROUTER_PUSH, string>;
export type RouterPop = AppAction<typeof ROUTER_POP>;
export type RouterReplace = AppActionP<typeof ROUTER_REPLACE, string>;
export type RouterNavigate = AppActionP<typeof ROUTER_NAVIGATE, string>;

export const routerInit = () => createAction(ROUTER_INIT);
export const routerPush = (path: string) => createAction1(ROUTER_PUSH, path);
export const routerPop = () => createAction(ROUTER_POP);
export const routerReplace = (path: string): RouterReplace => createAction1(ROUTER_REPLACE, path);
export const routerNavigate = (path: string): RouterNavigate => createAction1(ROUTER_NAVIGATE, path);
