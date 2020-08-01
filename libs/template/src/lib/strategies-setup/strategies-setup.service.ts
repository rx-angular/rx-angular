import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExtendedStrategies } from './interfaces/extended-strategy';
import { DefaultStrategyName } from './interfaces/default-strategy-name.type';
import { StrategiesSetupState } from './interfaces/strategies-setup-state.interface';
import { RX_ANGULAR_DEFAULT_STRATEGY } from './tokens/default-strategy.token';
import { RX_ANGULAR_DEFAULT_INVISIBLE_STRATEGY } from './tokens/default-invisible-strategy.token';
import { RX_AVAILABLE_STRATEGIES } from './tokens/available-strategies.token';
import { pluck, distinctUntilChanged } from 'rxjs/operators';
import { strategyOrFallback } from './utils/strategy-or-fallback.util';

@Injectable({ providedIn: 'root' })
export class StrategiesSetupService<S extends string = DefaultStrategyName> {
  /**
   * Holds current visible and invisible strategies.
   * Default values
   * - currentStrategy: 'local' or strategy passed in TemplateModule.forRoot()
   * - currentInvisibleStrategy: 'noop' or strategy passed in TemplateModule.forRoot()
   */
  private state$ = new BehaviorSubject<
    StrategiesSetupState<keyof ExtendedStrategies<S>>
  >({
    currentStrategy: this.defaultStrategy,
    currentInvisibleStrategy: this.outOfViewportStrategy,
  });

  strategy$ = this.state$.pipe(
    pluck('currentStrategy'),
    distinctUntilChanged()
  );
  outOfViewportStrategy$ = this.state$.pipe(
    pluck('currentInvisibleStrategy'),
    distinctUntilChanged()
  );
  constructor(
    @Inject(RX_ANGULAR_DEFAULT_STRATEGY)
    private defaultStrategy: keyof ExtendedStrategies<S>,
    @Inject(RX_ANGULAR_DEFAULT_INVISIBLE_STRATEGY)
    private outOfViewportStrategy: keyof ExtendedStrategies<S>,
    @Inject(RX_AVAILABLE_STRATEGIES) private strategies: ExtendedStrategies<S>
  ) {}

  setStrategy(strategy: keyof ExtendedStrategies<S>) {
    const snapshot = this.snapshot;

    this.state$.next({
      ...this.snapshot,
      currentStrategy: strategyOrFallback(
        this.strategies,
        strategy,
        snapshot.currentStrategy
      ),
    });
  }

  setInvisibleStrategy(strategy: keyof ExtendedStrategies<S>) {
    const snapshot = this.snapshot;

    this.state$.next({
      ...snapshot,
      currentInvisibleStrategy: strategyOrFallback(
        this.strategies,
        strategy,
        snapshot.currentStrategy
      ),
    });
  }

  private get snapshot() {
    return this.state$.getValue();
  }
}
