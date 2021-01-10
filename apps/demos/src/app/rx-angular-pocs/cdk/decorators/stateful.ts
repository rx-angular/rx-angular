import {
  ɵɵdirectiveInject as directiveInject,
  ChangeDetectorRef, Type
} from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StrategyCredentials } from '../render-strategies/model/strategy-credentials';
import { StrategyProvider } from '../render-strategies/strategy-provider.service';

export function renderOnChange<T = Type<any>>(
  component: T,
  keys: (keyof T)[],
  config: {
    cdRef: ChangeDetectorRef,
    strategyName?: string
  }
) {

  const strategyProvider: StrategyProvider = directiveInject(StrategyProvider);
  const strategyName = config?.strategyName || strategyProvider.primaryStrategy;
  const strategy = strategyProvider.strategies[strategyName];

  function scheduleCD(s: StrategyCredentials, work: () => void): AbortController {
    const abC = new AbortController();
    of(null).pipe(
      s.behavior(work, component),
      takeUntil(fromEvent(abC.signal, 'abort'))
    ).subscribe();
    return abC;
  }

  let workScheduled: AbortController;

  const values = new Map<keyof T, any>();
  keys.forEach(key => {
    Object.defineProperty(component, key, {
      get: function() {
        return values.get(key);
      },
      set: function(newVal: any) {
        values.set(key, newVal);
        if (workScheduled) {
          workScheduled.abort();
        }
        const work = () => {
          strategy.work(config.cdRef, component);
        };
        workScheduled = scheduleCD(strategy, work);
      },
      enumerable: true,
      configurable: true
    });
  })
}
