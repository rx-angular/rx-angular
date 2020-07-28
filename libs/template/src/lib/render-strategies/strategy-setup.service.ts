import { Injectable } from '@angular/core';
import { patch, RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { availableStrategies } from './constants/default-strategies.constant';
import { AddStrategyRequest } from './interfaces/add-strategy-request.interface';
import { ExtendedStrategies } from './interfaces/extended-strategy';
import { DefaultStrategyName } from './interfaces/default-strategy-name.type';
import { StrategySetupState } from './interfaces/strategy-setup-state.interface';

@Injectable({ providedIn: 'root' })
export class StrategySetupService<
  S extends string = DefaultStrategyName
> extends RxState<StrategySetupState<keyof ExtendedStrategies<S>>> {
  private strategyChange$ = new Subject<keyof ExtendedStrategies<S>>();
  private outOfViewportStrategyChange$ = new Subject<
    keyof ExtendedStrategies<S>
  >();
  private newStrategyRegistration$ = new Subject<AddStrategyRequest<S>>();

  strategy$ = this.select('currentStrategy');
  outOfViewportStrategy$ = this.select('currentOutOfViewportStrategy');

  get strategy(): keyof ExtendedStrategies<S> {
    return this.get().currentStrategy;
  }

  get outOfViewportStrategy(): keyof ExtendedStrategies<S> {
    return this.get().currentOutOfViewportStrategy;
  }

  constructor() {
    super();
    this.set({
      strategies: availableStrategies as ExtendedStrategies<S>,
      currentStrategy: 'local',
      currentOutOfViewportStrategy: 'noop'
    });

    this.connect('currentStrategy', this.strategyChange$, (state, strategy) =>
      this.strategyExists(state.strategies, strategy)
        ? strategy
        : state.currentStrategy
    );

    this.connect(
      'currentOutOfViewportStrategy',
      this.outOfViewportStrategyChange$,
      (state, strategy) =>
        this.strategyExists(state.strategies, strategy)
          ? strategy
          : state.currentOutOfViewportStrategy
    );

    this.connect(this.newStrategyRegistration$, (state, strategy) => ({
      strategies: patch(state.strategies, {
        [strategy.name]: strategy.constructor
      } as Partial<ExtendedStrategies<S>>),
      currentStrategy: strategy.options?.setAsDefault
        ? strategy.name
        : state.currentStrategy,
      currentOutOfViewportStrategy: strategy.options?.setAsOutOfViewPortDefault
        ? strategy.name
        : state.currentOutOfViewportStrategy
    }));
  }

  changeStrategy(strategy: keyof ExtendedStrategies<S>) {
    this.strategyChange$.next(strategy);
  }

  changeOutOfViewportStrategy(strategy: keyof ExtendedStrategies<S>) {
    this.outOfViewportStrategyChange$.next(strategy);
  }

  addNewStrategy(request: AddStrategyRequest<S>) {
    this.newStrategyRegistration$.next(request);
  }

  private strategyExists(
    strategies: ExtendedStrategies<S>,
    strategy: keyof ExtendedStrategies<S>
  ): boolean {
    const isExisting = strategies[strategy];

    if (!isExisting) {
      console.warn(`Strategy ${strategy} not found`);
    }

    return !!isExisting;
  }
}
