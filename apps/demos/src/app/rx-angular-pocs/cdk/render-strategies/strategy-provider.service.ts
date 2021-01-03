import { ChangeDetectorRef, Inject, Injectable, Optional } from '@angular/core';
import { RxState, selectSlice } from '@rx-angular/state';
import { fromEvent, Observable, of } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';

import {RX_CUSTOM_STRATEGIES } from './tokens/custom-strategies-token';
import {RX_PRIMARY_STRATEGY} from './tokens/default-primary-strategy-token';
import {getDefaultStrategyCredentialsMap} from './strategies/default.strategies';
import {mergeStrategies} from './utils/strategy-helper';
import { StrategyCredentials, StrategyCredentialsMap } from './model/strategy-credentials';

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
              @Inject(RX_PRIMARY_STRATEGY)
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

  scheduleCD(cdRef: ChangeDetectorRef, options?: {
    context?: any, strategy?: string, afterCD?: () => void, abortCtrl?: AbortController
  }): AbortController {
    const strategy = this.strategies[options?.strategy] || this._primaryStrategy;
    const context = options?.context || cdRef;
    const abC = options?.abortCtrl || new AbortController();
    const work = () => {
      strategy.work(cdRef, context);
      if (options?.afterCD) {
        options.afterCD();
      }
    };
    of(null).pipe(
      strategy.behavior(work, context),
      takeUntil(fromEvent(abC.signal, 'abort'))
    ).subscribe();
    return abC;
  }

}

