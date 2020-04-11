import { Observable } from 'rxjs';
import { CdStrategy, DEFAULT_STRATEGY_NAME } from '@ngx-rx/ngrx-component-experiments';
import { distinctUntilChanged, map, startWith, tap } from 'rxjs/operators';
import { StrategySelection } from '../cd-aware';

export function nameToStrategy<U>(strategies: StrategySelection<U>) {
  return (o$: Observable<string>): Observable<CdStrategy<U>> => {
    return o$.pipe(
      distinctUntilChanged(),
      startWith(DEFAULT_STRATEGY_NAME),
      map((strategy: string): CdStrategy<U> => strategies[strategy] ? strategies[strategy] : strategies.idle)
    );
  }
}
