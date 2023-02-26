import { Observable } from 'rxjs';
import { RxState as RxS } from '@rx-angular/state';

export type ValuesOf<O> = O[keyof O];
// type Keys = KeysOf<{ a: string, b: number }>; // "a" | "b"
export type KeysOf<O> = keyof O;

// class vs instance
type InstanceOrType<T> = T extends abstract new (...args: any) => infer R
  ? R
  : T;

// We infer all arguments instead of just the first one as we are more flexible for later changes
type InferArguments<T> = T extends (...args: infer R) => any ? R : never;

// It helps to infer the type of an objects key
// We have to use it because using just U[K] directly would @TODO
type Select<U, K> = K extends keyof U ? U[K] : never;

type ExtractString<T extends object> = Extract<keyof T, string>;

// Helper to get either the params of the transform function, or if the function is not present a fallback type
type FunctionParamsOrValueType<U, K, F> = InferArguments<
  Select<U, K>
> extends never
  ? [F]
  : InferArguments<Select<U, K>>;

export type StateSlice = {};

export type PropGetter<T extends {}, R> = Partial<{
  [K in keyof T]: (...args: any[]) => T[K];
}>;

export type ActionDispatchFn<O extends unknown[]> = (
  ...value: InstanceOrType<O>
) => void;

export type GetProp<T extends StateSlice> = {
  [K in keyof T]: () => InstanceOrType<T[K]>;
};

export type SetProp<T extends StateSlice, U extends {}> = {
  [K in keyof T]: (v: T[K]) => void;
};

export type SelectProp<T extends StateSlice> = {
  [K in ExtractString<T> as `${K}$`]: Observable<InstanceOrType<T[K]>>;
};
export type ConnectProp<T extends StateSlice> = {
  [K in ExtractString<T> as `$${K}`]: (
    o$: Observable<InstanceOrType<T[K]>>
  ) => void;
};

export type RxState<T extends StateSlice, U extends {} = T> = RxS<T> &
  GetProp<T> &
  SetProp<T, U> &
  SelectProp<T> &
  ConnectProp<T> &
  (() => ValuesOf<T>); /*& {
  $: (props: (keyof T)[]) => Observable<ValuesOf<T>>;
} &
((slice: Partial<T>) => void) & {
  $: (props: (keyof T)[]) => Observable<ValuesOf<T>>;
};
*/
