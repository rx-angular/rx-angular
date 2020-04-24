import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import {
  RenderStrategy,
  DEFAULT_STRATEGY_NAME,
  StrategySelection
} from './strategies';

export function nameToStrategy<U>(strategies: StrategySelection<U>) {
  return (o$: Observable<string>): Observable<RenderStrategy<U>> => {
    return o$.pipe(
      distinctUntilChanged(),
      map(
        (strategy: string): RenderStrategy<U> =>
          strategies[strategy]
            ? strategies[strategy]
            : strategies[DEFAULT_STRATEGY_NAME]
      )
    );
  };
}
