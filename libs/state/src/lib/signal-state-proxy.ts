import {
  DestroyRef,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { select } from '@rx-angular/state/selections';
import { Observable } from 'rxjs';

export type SignalStateProxy<State extends object> = {
  [K in keyof State]: Signal<State[K]>;
};

export function createSignalStateProxy<State extends object>(
  state$: Observable<State>,
  stateFn: <K extends keyof State>(k: K) => State[K]
) {
  const destroyRef = inject(DestroyRef);

  const signalState = {} as SignalStateProxy<State>;
  return new Proxy<SignalStateProxy<State>>(signalState, {
    get<K extends keyof State>(
      target: SignalStateProxy<State>,
      p: K | string | symbol
    ): Signal<State[K]> {
      let _signal = target[p as K];
      if (!_signal) {
        const val = stateFn(p as K);
        _signal = signal(val);
        target[p as K] = _signal;
        state$
          .pipe(select(p as K), takeUntilDestroyed(destroyRef))
          .subscribe((val) => (_signal as WritableSignal<State[K]>).set(val));
      }
      return _signal;
    },
    has<K extends keyof State>(
      target: SignalStateProxy<State>,
      prop: K | string | symbol
    ) {
      return !!target[prop as K];
    },
    ownKeys(target) {
      return [...Reflect.ownKeys(target)];
    },
    getOwnPropertyDescriptor(target, key) {
      return {
        enumerable: true,
        configurable: true,
      };
    },
    set(): boolean {
      return true;
    },
  });
}
