import { ChangeDetectorRef, Inject, Injectable } from '@angular/core';
import { patch, RxState, selectSlice, toDictionary } from '@rx-angular/state';
import { getStrategies, RenderStrategy } from '@rx-angular/template';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { StrategyTokenProvider } from './strategy.token';
import { Observable } from 'rxjs';
import { pluck, map } from 'rxjs/operators';

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
    private customStrategy: RenderStrategy[],
    public cdRef: ChangeDetectorRef
  ) {
    super();
    this.hold(this.$, console.log);
  }

  setStrategy(currentStrategy: string) {
    this.set({
      currentStrategy,
    });
  }

  setInvisibleStrategy(currentInvisibleStrategy: string) {
    this.set({ currentInvisibleStrategy });
  }

  assignStrategies() {
    this.set({
      strategies: patch(
        getStrategies({ cdRef: this.cdRef }),
        toDictionary(this.customStrategy, 'name')
      ),
    });
  }
}
