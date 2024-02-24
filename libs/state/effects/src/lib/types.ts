import { ObservableInput, PartialObserver } from 'rxjs';

export type SideEffectObservable<T> = ObservableInput<T>;
export type SideEffectFnOrObserver<T> =
  | PartialObserver<T>
  | ((value: T) => void);
