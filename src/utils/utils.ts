import { AppAction, StateReducers } from "../types/types";

type HasId = {
  id: string;
};

export const addUnique = <T>(items: Array<T & HasId>, item: T & HasId): Array<T> =>
  items.some(x => x.id === item.id) ? items : [...items, item];

export const createReducer = <S>(handlers: StateReducers<S>, initialState: S) => (
  state: S = initialState,
  action: AppAction
) => (handlers[action.type] ? handlers[action.type](state, action) : state);
