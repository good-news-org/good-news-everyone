import { AppAction, AppActionP, StateReducers } from "../types/types";

type HasId = {
  id: string;
};

export const or = <T>(a: T | undefined, b: T) => (a ? a : b);

export const addUnique = <T>(items: Array<T & HasId>, item: T & HasId): Array<T> =>
  items.some(x => x.id === item.id) ? items : [...items, item];

export const createReducer = <S>(handlers: StateReducers<S>, initialState: S) => (
  state: S = initialState,
  action: AppAction<any>
) => (handlers[action.type] ? handlers[action.type](state, action) : state);

export const createAction = <T extends string>(type: T): AppAction<T> => ({ type });

export const createAction1 = <T extends string, P>(type: T, payload: P): AppActionP<T, P> => ({
  type,
  payload
});

export const getColor = (id: string) => Math.random() * 360;