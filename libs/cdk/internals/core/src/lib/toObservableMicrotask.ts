import {
  assertInInjectionContext,
  DestroyRef,
  effect,
  inject,
  Injector,
  Signal,
  untracked,
} from '@angular/core';
import { toObservable, ToObservableOptions } from '@angular/core/rxjs-interop';
import { Observable, ReplaySubject } from 'rxjs';

// Copied from angular/core/rxjs-interop/src/to_observable.ts -> because it's a private API
// https://github.com/angular/angular/blob/46f00f951842dd117653df6cca3bfd5ee5baa0f1/packages/core/rxjs-interop/src/to_observable.ts#L72
export function toObservableMicrotaskInternal<T>(
  source: Signal<T>,
  options?: ToObservableOptions,
): Observable<T> {
  if (!options?.injector) {
    assertInInjectionContext(toObservable);
  }

  const injector = options?.injector ?? inject(Injector);
  const subject = new ReplaySubject<T>(1);

  const watcher = effect(
    () => {
      let value: T;
      try {
        value = source();
      } catch (err) {
        untracked(() => subject.error(err));
        return;
      }
      untracked(() => subject.next(value));
    },
    { injector, manualCleanup: true },
  );

  injector.get(DestroyRef).onDestroy(() => {
    watcher.destroy();
    subject.complete();
  });

  return subject.asObservable();
}
