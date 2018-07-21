import { AppAction, StateReducers, AppActionType } from "../types/types";

type HasId = {
  id: string;
};

export const addUnique = <T>(items: Array<T & HasId>, item: T & HasId): Array<T> =>
  items.some(x => x.id === item.id) ? items : [...items, item];

export const createReducer = <S>(handlers: StateReducers<S>, initialState: S) => (
  state: S = initialState,
  action: AppAction
) => (handlers[action.type] ? handlers[action.type](state, action) : state);

export const createAction = <A extends AppAction>(type: AppActionType) => () => ({ type });

export const createAction1 = <A extends AppAction, T>(type: AppActionType) => (payload: T) => ({ type, payload });

export const createAction2 = <A extends AppAction, T, S>(type: AppActionType) => (a: T, b: S) => ({
  type,
  payload: { a, b }
});

export const getColor = (id: string) => Math.random() * 360;