import type { ObservableInput, PartialObserver } from 'rxjs';
import { EMPTY, from, pipe, Subject, Subscription } from 'rxjs';

export type SideEffectObservable<T> = ObservableInput<T>;
export type SideEffectFnOrObserver<T> =
  | PartialObserver<T>
  | ((value: T) => void);
