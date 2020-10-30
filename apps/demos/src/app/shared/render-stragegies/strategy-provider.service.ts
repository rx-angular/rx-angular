import { Inject, Injectable, Optional } from '@angular/core';
import { RxState, selectSlice } from '@rx-angular/state';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {
  getDefaultStrategyCredentialsMap,
  mergeStrategies,
  RX_CUSTOM_STRATEGIES,
  RX_DEFAULT_STRATEGY,
  StrategyCredentials,
  StrategyCredentialsMap
} from '../render-stragegies';

@Injectable({providedIn: 'root'})
export class StrategyProvider extends RxState<{
  primaryStrategy: StrategyCredentials;
  secondaryStrategy: StrategyCredentials;
  strategies: StrategyCredentialsMap
}> {

  _strategies: StrategyCredentialsMap;
  get strategies() {
    return this._strategies
  }
  get strategyNames() {
    return Object.values(this._strategies).map(s => s.name)
  }

  _primaryStrategy: StrategyCredentials;
  get primaryStrategy() {
    return this._primaryStrategy.name
  }
  set primaryStrategy(strategyName: string) {
    this.set({ primaryStrategy: this.strategies[strategyName] });
  }

  _secondaryStrategy: StrategyCredentials;
  get secondaryStrategy() {
    return this._secondaryStrategy.name
  }
  set secondaryStrategy(strategyName: string) {
    this.set({ secondaryStrategy: this.strategies[strategyName] });
  }

  primaryStrategy$: Observable<StrategyCredentials> = this.select(
    selectSlice(['primaryStrategy', 'strategies']),
    map(({ primaryStrategy, strategies }) => strategies[primaryStrategy.name]),
    shareReplay({refCount: true, bufferSize: 1})
  );

  secondaryStrategy$: Observable<StrategyCredentials> = this.select(
    selectSlice(['secondaryStrategy', 'strategies']),
    map(({ secondaryStrategy, strategies }) => strategies[secondaryStrategy.name]),
    shareReplay({refCount: true, bufferSize: 1})
  );

  strategies$ = this.select('strategies');

  constructor(@Optional()
              @Inject(RX_CUSTOM_STRATEGIES)
              private customStrategies: StrategyCredentialsMap[],
              @Inject(RX_DEFAULT_STRATEGY)
              private defaultStrategy: string) {
    super();
    this._strategies = this.customStrategies.reduce((a, i) => mergeStrategies(a, i), getDefaultStrategyCredentialsMap());
    this.set({
      primaryStrategy: this.strategies[defaultStrategy],
      secondaryStrategy: this.strategies['noop'],
      strategies: this.strategies
    });
    this.hold(this.strategies$, s => this._strategies = s);
    this.hold(this.primaryStrategy$, s => this._primaryStrategy = s);
    this.hold(this.secondaryStrategy$, s => this._secondaryStrategy = s);
  }

  registerStrategies(customStrategies: StrategyCredentialsMap) {
    this.set({ strategies: { ...customStrategies } });
  }

}

