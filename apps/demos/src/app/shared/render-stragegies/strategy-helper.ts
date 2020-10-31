import { map, publish, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { StrategyCredentials, StrategyCredentialsMap } from './model';
import { RxNotification } from '@rx-angular/template';

export function nameToStrategyCredentials(strategies: StrategyCredentialsMap, defaultStrategyName: string) {
  return (o$: Observable<string>): Observable<StrategyCredentials> => o$.pipe(
    map(name => Object.keys(strategies).includes(name) ? strategies[name] : strategies[defaultStrategyName])
  );
}

export function mergeStrategies(...strategiesArray: Array<StrategyCredentialsMap>): StrategyCredentialsMap {
  return strategiesArray.reduce((c, a) => {
    const _a = Array.isArray(a) ? strategiesArray.reduce((_c, __a) => ({ ..._c, ...__a }), {}) : a || {};
    return { ...c, ..._a };
  }, {});
}

export function applyStrategy<T>(
  credentials$: Observable<StrategyCredentials>,
  context,
  getCdRef
): (o$: Observable<RxNotification<T>>) => Observable<RxNotification<T>> {
  return notification$ => notification$.pipe(
    publish((n$) =>
      credentials$.pipe(
        switchMap((credentials) => n$.pipe(
          switchMap(n => {
            const cdRef = getCdRef(n.kind);
            const work = () => credentials.work(cdRef, context);
            return of(n).pipe(credentials.behavior(work, cdRef));
          })
          )
        )
      )
    )
  );
}
