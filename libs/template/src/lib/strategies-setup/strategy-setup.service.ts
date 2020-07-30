import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExtendedStrategies } from './interfaces/extended-strategy';
import { DefaultStrategyName } from './interfaces/default-strategy-name.type';
import { StrategySetupState } from './interfaces/strategy-setup-state.interface';
import { RX_ANGULAR_DEFAULT_STRATEGY } from './tokens/default-strategy.token';
import { RX_ANGULAR_DEFAULT_INVISIBLE_STRATEGY } from './tokens/default-invisible-strategy.token';
import { RX_AVAILABLE_STRATEGIES } from './tokens/available-strategies.token';
import { pluck, distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StrategySetupService<S extends string = DefaultStrategyName> {
  private state$ = new BehaviorSubject<
    StrategySetupState<keyof ExtendedStrategies<S>>
  >({
    currentStrategy: this.defaultStrategy,
    currentOutOfViewportStrategy: this.outOfViewportStrategy,
  });

  strategy$ = this.state$.pipe(
    pluck('currentStrategy'),
    distinctUntilChanged()
  );
  outOfViewportStrategy$ = this.state$.pipe(
    pluck('currentOutOfViewportStrategy'),
    distinctUntilChanged()
  );

  set strategy(strategy: keyof ExtendedStrategies<S>) {
    const snapshot = this.snapshot;
    this.state$.next({
      ...this.snapshot,
      currentStrategy: this.strategyOrFallback(
        strategy,
        snapshot.currentStrategy
      ),
    });
  }

  set invisibleStrategy(strategy: keyof ExtendedStrategies<S>) {
    const snapshot = this.snapshot;

    this.state$.next({
      ...snapshot,
      currentOutOfViewportStrategy: this.strategyOrFallback(
        strategy,
        snapshot.currentOutOfViewportStrategy
      ),
    });
  }

  constructor(
    @Inject(RX_ANGULAR_DEFAULT_STRATEGY)
    private defaultStrategy: keyof ExtendedStrategies<S>,
    @Inject(RX_ANGULAR_DEFAULT_INVISIBLE_STRATEGY)
    private outOfViewportStrategy: keyof ExtendedStrategies<S>,
    @Inject(RX_AVAILABLE_STRATEGIES) private strategies: ExtendedStrategies<S>
  ) {
    this.state$.subscribe(console.log);
  }

  private strategyOrFallback(
    strategy: keyof ExtendedStrategies<S>,
    fallback: keyof ExtendedStrategies<S>
  ): keyof ExtendedStrategies<S> {
    const isExisting = this.strategies[strategy];

    if (!isExisting) {
      console.warn(
        `Strategy '${strategy}' not found. Using '${fallback}' instead`
      );

      return fallback;
    }

    return strategy;
  }

  private get snapshot() {
    return this.state$.getValue();
  }
}
