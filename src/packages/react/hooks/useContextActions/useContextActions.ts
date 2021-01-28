import {
  useReducer,
  useMemo,
  Reducer,
  createContext as createReactContext,
  Context,
} from "react";
import produce from "immer";
import {
  MixedReducerHandler,
  PayloadType,
  ReducersActions,
  ReducerAction,
  AsyncReducerHandler,
  ReducerHandler,
} from "./types";

export default function useContextActions<
  TState,
  T extends {
    [K in keyof T]: MixedReducerHandler<TState, T[K]>;
  },
  TAction extends keyof T,
  TPayload extends PayloadType<TState, T[TAction]>
>(initialState: TState, reducers: T): [TState, ReducersActions<TState, T>] {
  const reducer: Reducer<TState, ReducerAction<TAction, TPayload>> = useMemo(
    () =>
      produce((state, action) => {
        const { type, payload, pending, fullfilled, rejected } = action;
        const reducer = reducers[type];
        const asyncReducer = reducer as AsyncReducerHandler<
          TState,
          unknown,
          TPayload
        >;
        if (!!asyncReducer.promise) {
          if (pending && asyncReducer.pending)
            return asyncReducer.pending(state, payload);
          if (fullfilled)
            return asyncReducer.fullfilled(state, fullfilled, payload);
          else if (rejected)
            return asyncReducer.rejected(state, rejected, payload);
          else return state;
        } else
          return (reducer as ReducerHandler<TState, TPayload>)(state, payload);
      }),
    [reducers]
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(() => {
    const act = {};
    for (const [key, reducer] of Object.entries(reducers)) {
      const type = key as TAction;
      const asyncReducer = reducer as AsyncReducerHandler<
        TState,
        unknown,
        TPayload
      >;
      if (!!asyncReducer.promise) {
        const { promise } = asyncReducer;
        act[key] = (payload: TPayload) => {
          dispatch({ type, payload, pending: true });
          promise(payload)
            .then((fullfilled) => dispatch({ type, payload, fullfilled }))
            .catch((rejected: Error) => dispatch({ type, payload, rejected }));
        };
      } else act[key] = (payload: TPayload) => dispatch({ type, payload });
    }
    return act as ReducersActions<TState, T>;
  }, [reducers]);

  return [state, actions];
}

export function createContext<
  TState,
  T extends {
    [K in keyof T]: MixedReducerHandler<TState, T[K]>;
  },
  TAction extends keyof T,
  TPayload extends PayloadType<TState, T[TAction]>
>(
  initialState: TState,
  reducers: T
): Context<[TState, ReducersActions<TState, T>]> {
  const actions = {};
  for (const type of Object.keys(reducers)) actions[type] = (_: TPayload) => {};

  return createReactContext([
    initialState,
    actions as ReducersActions<TState, T>,
  ]);
}
