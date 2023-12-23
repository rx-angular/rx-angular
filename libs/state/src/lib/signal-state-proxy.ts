import {
  DestroyRef,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { select } from '@rx-angular/state/selections';
import { RxState } from './rx-state.service';

export type SignalStateProxy<State extends object> = {
  [K in keyof State]: Signal<State[K]>;
};

export function createSignalStateProxy<State extends object>(
  state$: Observable<State>,
  stateFn: RxState<State>['get']
) {
  const destroyRef = inject(DestroyRef);

  const signalState = {} as SignalStateProxy<State>;
  return new Proxy<SignalStateProxy<State>>(signalState, {
    get<K extends keyof State>(
      target: SignalStateProxy<State>,
      key: string // nested.state.key.to.get
    ): Signal<State[K]> {
      const keyFields = key.split('.'); // ['nested', 'state', 'key', 'to', 'get']
      let _signal = target[key];
      if (!_signal) {
        // get initial value from stateFn
        const val = stateFn(...(keyFields as [K])); // get the value from the stateFn; TODO: fix types
        _signal = signal(val);
        target[key] = _signal;
        state$
          .pipe(select(...(keyFields as [any])), takeUntilDestroyed(destroyRef))
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
