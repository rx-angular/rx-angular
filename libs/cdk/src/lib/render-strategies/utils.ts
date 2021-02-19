import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StrategyCredentials, StrategyCredentialsMap } from '../model';

export function nameToStrategyCredentials(
  strategies: StrategyCredentialsMap,
  defaultStrategyName: string
) {
  return (
    o$: Observable<string | null | undefined>
  ): Observable<StrategyCredentials> =>
    o$.pipe(
      map((name) =>
        name && Object.keys(strategies).includes(name)
          ? strategies[name]
          : strategies[defaultStrategyName]
      )
    );
}
