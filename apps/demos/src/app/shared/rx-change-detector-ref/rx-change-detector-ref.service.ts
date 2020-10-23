import { ChangeDetectorRef, Inject, Injectable } from '@angular/core';
import { RxState, selectSlice } from '@rx-angular/state';
import { DEFAULT_STRATEGY_NAME, getStrategies, RenderStrategy } from '@rx-angular/template';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { StrategyTokenProvider, StrategyTokenProviderMap } from './strategy.token';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

@Injectable()
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

  constructor(
    @Inject(StrategyTokenProvider)
    private customStrategy: StrategyTokenProviderMap[],
    public cdRef: ChangeDetectorRef
  ) {
    super();
    this.initStrategies();
    this.set({ 'currentStrategy': DEFAULT_STRATEGY_NAME });
    this.hold(this.$, console.log);
  }

  setStrategy(currentStrategy: string) {
    this.set({
      currentStrategy
    });
  }

  setInvisibleStrategy(currentInvisibleStrategy: string) {
    this.set({ currentInvisibleStrategy });
  }

  initStrategies() {
    this.set({
      strategies: this.customStrategy
        .reduce((acc, o) => ({ ...acc, ...o.factory({ cdRef: this.cdRef }) }),
          getStrategies({ cdRef: this.cdRef })
        )
    });
  }

}
