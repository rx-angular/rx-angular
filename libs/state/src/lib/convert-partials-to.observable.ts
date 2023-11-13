import {
  combineLatest,
  isObservable,
  Observable,
  startWith,
  timer,
} from 'rxjs';
import { Injector, isSignal, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { coalesceWith } from '@rx-angular/cdk/coalescing';

export function convertPartialsToObservable<
  T extends object,
  K extends keyof T
>(
  input: Partial<{ [K: string]: Observable<T[K]> | Signal<T[K]> }>,
  injector?: Injector
): Observable<Partial<T>> {
  const keys = Object.keys(input);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const observables = keys.map((key) => {
    const obsOrSignal = input[key];

    if (isObservable(obsOrSignal)) {
      return obsOrSignal?.pipe(startWith(undefined));
    }
    if (isSignal(obsOrSignal)) {
      return toObservable(obsOrSignal, { injector });
    }
  });

  return combineLatest(observables).pipe(
    map((values) => {
      const result: Partial<T> = {} as Partial<T>;
      for (let i = 0; i < keys.length; i++) {
        // @ts-ignore
        result[keys[i]] = values[i];
      }
      return result;
    }),
    coalesceWith(timer(0))
  );
}
