import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StrategiesSetupState, DefaultStrategies } from './interfaces';
import { pluck, distinctUntilChanged } from 'rxjs/operators';
import { DEFAULT_STRATEGY_NAME } from '../../render-strategies/strategies/strategies-map';

@Injectable({ providedIn: 'root' })
export class StrategiesSetupService {
  /**
   * Holds current visible and invisible strategies.
   * Default values
   * - currentStrategy: 'local'
   * - currentInvisibleStrategy: 'noop'
   */
  private state$ = new BehaviorSubject<StrategiesSetupState>({
    currentStrategy: DEFAULT_STRATEGY_NAME,
    currentInvisibleStrategy: 'noop',
  });

  strategy$: Observable<keyof DefaultStrategies> = this.state$.pipe(
    pluck('currentStrategy'),
    distinctUntilChanged()
  );
  outOfViewportStrategy$: Observable<
    keyof DefaultStrategies
  > = this.state$.pipe(
    pluck('currentInvisibleStrategy'),
    distinctUntilChanged()
  );
  constructor() {}

  setStrategy(strategy: keyof DefaultStrategies) {
    const snapshot = this.snapshot;

    this.state$.next({
      ...snapshot,
      currentStrategy: strategy,
    });
  }

  setInvisibleStrategy(strategy: keyof DefaultStrategies) {
    const snapshot = this.snapshot;

    this.state$.next({
      ...snapshot,
      currentInvisibleStrategy: strategy,
    });
  }

  private get snapshot() {
    return this.state$.getValue();
  }
}
