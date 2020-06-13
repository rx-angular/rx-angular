import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { RenderStrategy, StrategySelection } from './interfaces';

export function nameToStrategy<U>(strategies: StrategySelection<U>) {
  return (o$: Observable<string>): Observable<RenderStrategy<U>> => {
    return o$.pipe(
      distinctUntilChanged(),
      map(
        (strategy: string): RenderStrategy<U> => {
          const s = strategies[strategy];
          if (!!s) {
            return s;
          }
          throw new Error(`Strategy ${strategy} does not exist.`);
        }
      )
    );
  };
}
