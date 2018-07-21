export type Idle = {
  state: "IDLE";
};

export type Loading = {
  state: "LOADING";
};

export type Success<T> = {
  state: "SUCCESS";
  result: T;
};

export type Error<E> = {
  state: "ERROR";
  error: E;
};

export type Loadable<T, E = any> = Idle | Loading | Success<T> | Error<E>;

export const IDLE: Idle = {
  state: "IDLE"
};

export const LOADING: Loading = {
  state: "LOADING"
};

export const success = <T>(result: T): Success<T> => ({
  state: "SUCCESS",
  result
});

export const error = <E = any>(error: E): Error<E> => ({
  state: "ERROR",
  error
});
