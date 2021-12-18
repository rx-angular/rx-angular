import { Observable, Subject } from 'rxjs';
import {
  ExtractString,
  InferArguments,
  InstanceOrType,
  Select,
} from '../../utils/src/lib/types';

// Helper to get either the params of the transform function, or if the function is not present a fallback type
type FunctionParamsOrValueType<U, K, F> = InferArguments<
  Select<U, K>
  > extends never
  ? [F]
  : InferArguments<Select<U, K>>;

export type SubjectMap<T> = { [K in keyof T]: Subject<T[K]> }

export type Actions = {};

export type ActionTransforms<T extends {}> = Partial<{
  [K in keyof T]: (...args: any[]) => T[K];
}>;

export type ActionDispatchFn<O extends unknown[]> = (
  ...value: InstanceOrType<O>
) => void;

export type ActionDispatchers<T extends Actions, U extends {}> = {
  [K in keyof T]: ActionDispatchFn<
    FunctionParamsOrValueType<U, K, Select<T, K>>
  >;
};

export type ActionObservables<T extends Actions> = {
  [K in ExtractString<T> as `${K}$`]: Observable<InstanceOrType<T[K]>>;
};

export type RxActions<T extends Actions, U extends {} = T> = ActionDispatchers<T, U> & ActionObservables<T>;
