import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { RenderStrategy, StrategySelection } from './interfaces';

export function nameToStrategy(strategies: StrategySelection) {
  return (o$: Observable<string>): Observable<RenderStrategy> => {
    return o$.pipe(
      distinctUntilChanged(),
      map(
        (strategy: string): RenderStrategy => {
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
