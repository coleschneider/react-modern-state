export type ReducerHandler<TState, TPayload> = (
  state: TState,
  payload: TPayload
) => TState;

export type AsyncReducerHandler<TState, TResult, TPayload> = {
  promise: (payload: TPayload) => Promise<TResult>;
  pending?: (state: TState, payload: TPayload) => TState;
  fullfilled: (state: TState, result: TResult, payload: TPayload) => TState;
  rejected: (state: TState, error: Error, payload: TPayload) => TState;
};

export type ReducerHandlerEmpty<TState> = (state: TState) => TState;

export type AsyncReducerHandlerEmpty<TState, TResult> = {
  promise: () => Promise<TResult>;
  pending?: (state: TState) => TState;
  fullfilled: (state: TState, result: TResult) => TState;
  rejected: (state: TState, error: Error) => TState;
};

export type MixedReducerHandler<TState, T> = T extends (state: TState) => TState
  ? ReducerHandlerEmpty<TState>
  : T extends (state: TState, payload: infer TPayload) => TState
  ? ReducerHandler<TState, TPayload>
  : T extends {
      fullfilled: (state: TState, result: infer TResult) => TState;
    }
  ? AsyncReducerHandlerEmpty<TState, TResult>
  : T extends {
      fullfilled: (
        state: TState,
        result: infer TResult,
        payload: infer TPayload
      ) => TState;
    }
  ? AsyncReducerHandler<TState, TResult, TPayload>
  : never;

export type PayloadType<TState, T> = T extends (state: TState) => TState
  ? undefined
  : T extends (state: TState, payload: infer TPayload) => TState
  ? TPayload
  : T extends {
      fullfilled: (state: TState, result: unknown) => TState;
    }
  ? undefined
  : T extends {
      fullfilled: (
        state: TState,
        result: unknown,
        payload: infer TPayload
      ) => TState;
    }
  ? TPayload
  : never;

export type ReducersActions<TState, T> = {
  [K in keyof T]: T[K] extends (x: TState) => TState
    ? () => void
    : T[K] extends (x: TState, payload: infer TPayload) => TState
    ? (payload: TPayload) => void
    : T[K] extends {
        fullfilled: (state: TState, result: unknown) => TState;
      }
    ? () => void
    : T[K] extends {
        fullfilled: (
          state: TState,
          result: unknown,
          payload: infer TPayload
        ) => TState;
      }
    ? (payload: TPayload) => void
    : never;
};

export type ReducerAction<TAction, TPayload> = {
  type: TAction;
  payload: TPayload;
} & (
  | { pending?: never; fullfilled?: never; rejected?: never }
  | { pending: boolean; fullfilled?: never; rejected?: never }
  | { fullfilled: unknown; pending?: never; rejected?: never }
  | { rejected: Error; pending?: never; fullfilled?: never }
);
