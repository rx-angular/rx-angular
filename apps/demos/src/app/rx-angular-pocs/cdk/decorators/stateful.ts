import { ChangeDetectorRef, ɵɵdirectiveInject as directiveInject } from '@angular/core';
import { StrategyProvider } from '../render-strategies/strategy-provider.service';

export function RxStateful() {

  return function(target, key) {
    let value;
    const getter = function() {
      console.log(`Get => ${key}`);
      return value;
    };

    const setter = function(newVal) {
      console.log(target);
      console.log(`Set: ${key} => ${newVal}`);
      value = newVal;
      // strategyProvider.scheduleCD()
    };

    Object.defineProperty(target, key, {
      get: function() {
        return value;
      },
      set: function(newVal: any) {
        console.log(target);
        console.log(`Set: ${key} => ${newVal}`);
        console.log(this)
        value = newVal;
      },
      /*enumerable: true,
      configurable: true*/
    });
  }
}
