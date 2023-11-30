import { combineLatest, from, isObservable, Observable, startWith } from 'rxjs';
import { Injector, isSignal, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { coalesceWith } from '@rx-angular/cdk/coalescing';
import { Promise } from '@rx-angular/cdk/zone-less/browser';

export function convertPartialsToObservable<
  T extends object,
  K extends keyof T
>(
  input: Partial<{ [K: string]: Observable<T[K]> | Signal<T[K]> }>,
  injector?: Injector
): Observable<Partial<T>> {
  const keys = Object.keys(input);

  const observables = keys.map((key) => {
    const obsOrSignal = input[key];

    if (isObservable(obsOrSignal)) {
      return obsOrSignal?.pipe(startWith(undefined));
    }
    if (isSignal(obsOrSignal)) {
      return toObservable(obsOrSignal, { injector });
    }

    throw new TypeError(`Expected type Observable or Signal for key "${key}"`);
  });

  return combineLatest(observables).pipe(
    coalesceWith(from(Promise.resolve())),
    map((values) => {
      const result: Partial<T> = {} as Partial<T>;
      for (let i = 0; i < keys.length; i++) {
        result[keys[i]] = values[i];
      }
      return result;
    })
  );
}
