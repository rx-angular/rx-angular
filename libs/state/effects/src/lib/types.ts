import {
  EMPTY,
  from,
  ObservableInput,
  PartialObserver,
  pipe,
  Subject,
  Subscription,
} from 'rxjs';

export type SideEffectObservable<T> = ObservableInput<T>;
export type SideEffectFnOrObserver<T> =
  | PartialObserver<T>
  | ((value: T) => void);
