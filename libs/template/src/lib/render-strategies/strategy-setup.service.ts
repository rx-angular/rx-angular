import { Injectable } from '@angular/core';
import { patch, RxState } from '@rx-angular/state';
import { StrategyNameType } from './interfaces/strategy-name.type';
import { availableStrategies } from './constants/default-strategies.constant';
import { Subject } from 'rxjs';
import { StrategySetupState } from './interfaces/strategy-setup-state.interface';
import { AddStrategyRequest } from './interfaces/add-strategy-request.interface';
import { AvailableStrategies } from './interfaces/available-strategies.interface';

@Injectable({ providedIn: 'root' })
export class StrategySetupService extends RxState<StrategySetupState> {
  private strategyChange$ = new Subject<StrategyNameType>();
  private outOfViewportStrategyChange$ = new Subject<StrategyNameType>();
  private newStrategyRegistration$ = new Subject<AddStrategyRequest>();

  strategy$ = this.select('currentStrategy');
  outOfViewportStrategy$ = this.select('currentOutOfViewportStrategy');

  get strategy(): StrategyNameType {
    return this.get().currentStrategy;
  }

  get outOfViewportStrategy(): StrategyNameType {
    return this.get().currentOutOfViewportStrategy;
  }

  constructor() {
    super();
    this.set({
      strategies: availableStrategies,
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
      }),
      currentStrategy: strategy.options?.setAsDefault
        ? strategy.name
        : state.currentStrategy,
      currentOutOfViewportStrategy: strategy.options?.setAsOutOfViewPortDefault
        ? strategy.name
        : state.currentOutOfViewportStrategy
    }));
  }

  changeStrategy(strategy: StrategyNameType) {
    this.strategyChange$.next(strategy);
  }

  changeOutOfViewportStrategy(strategy: StrategyNameType) {
    this.outOfViewportStrategyChange$.next(strategy);
  }

  addNewStrategy(request: AddStrategyRequest) {
    this.newStrategyRegistration$.next(request);
  }

  private strategyExists(
    strategies: AvailableStrategies,
    strategy: StrategyNameType
  ): boolean {
    const isExisting = strategies[strategy];

    if (!isExisting) {
      console.warn(`Strategy ${strategy} not found`);
    }

    return isExisting;
  }
}
