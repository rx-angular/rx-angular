import { ChangeDetectorRef, Injectable } from '@angular/core';
import { RxState, selectSlice } from '@rx-angular/state';
import { DEFAULT_STRATEGY_NAME, getStrategies, RenderStrategy } from '@rx-angular/template';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

// tslint:disable-next-line: nx-enforce-module-boundaries

@Injectable({
  providedIn: 'root'
})
export class RxChangeDetectorRef extends RxState<{
  currentStrategy: string;
  currentInvisibleStrategy: string;
  strategies: { [key: string]: RenderStrategy };
}> {
  strategy$: Observable<RenderStrategy> = this.select(
    selectSlice(['currentStrategy', 'strategies']),
    map(({ currentStrategy, strategies }) => strategies[currentStrategy])
  );

  outOfViewportStrategy$: Observable<RenderStrategy> = this.select(
    selectSlice(['currentInvisibleStrategy', 'strategies']),
    map(
      ({ currentInvisibleStrategy, strategies }) =>
        strategies[currentInvisibleStrategy]
    )
  );

  strategies$ = this.select(pluck('strategies'));

  constructor() // @Optional()
  // @Inject(StrategyTokenProvider)
  // private customStrategy: StrategyTokenProviderMap[]
  {
    super();
    this.set({ currentStrategy: DEFAULT_STRATEGY_NAME });
  }

  setStrategy(currentStrategy: string) {
    this.set({
      currentStrategy
    });
  }

  setInvisibleStrategy(currentInvisibleStrategy: string) {
    this.set({ currentInvisibleStrategy });
  }

  setCustomStrategy(customStrategy: any) {
    // this.customStrategy = [customStrategy];
  }

  setStrategies(cdRef: ChangeDetectorRef) {
    // if (this.customStrategy) {
    //   return this.set({
    //     strategies: this.customStrategy.reduce(
    //       (acc, o) => ({ ...acc, ...o.factory({ cdRef: cdRef }) }),
    //       getStrategies({ cdRef: cdRef })
    //     ),
    //   });
    // }
    this.set({
      strategies: getStrategies({ cdRef: cdRef })
    });
  }
}
