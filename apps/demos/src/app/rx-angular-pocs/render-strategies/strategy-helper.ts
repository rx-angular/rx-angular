import { map, publish, switchMap, tap } from 'rxjs/operators';
import { concat, NEVER, Observable, of } from 'rxjs';
import { StrategyCredentials, StrategyCredentialsMap } from './model';
import { RxNotification, RxTemplateObserver } from '../cdk/model';
import { ChangeDetectorRef } from '@angular/core';

export function nameToStrategyCredentials(strategies: StrategyCredentialsMap, defaultStrategyName: string) {
  return (o$: Observable<string>): Observable<StrategyCredentials> => o$.pipe(
    map(name => Object.keys(strategies).includes(name) ? strategies[name] : strategies[defaultStrategyName])
  );
}

export function mergeStrategies(...strategiesArray: Array<StrategyCredentialsMap>): StrategyCredentialsMap {
  return strategiesArray.reduce((c, a) => {
    // tslint:disable-next-line:variable-name
    const _a = Array.isArray(a) ? strategiesArray.reduce((_c, __a) => ({ ..._c, ...__a }), {}) : a || {};
    return { ...c, ..._a };
  }, {});
}

export function observeTemplateByNotificationKind<U>(templateObserver: RxTemplateObserver<U>) {
  return o$ => o$.pipe(tap((n: RxNotification<U>) => {
    if (n.kind === 'rxError') {
      templateObserver.error(n.error);
    } else if (n.kind === 'rxComplete') {
      templateObserver.complete();
    } else if (n.kind === 'rxNext') {
      templateObserver.next(n.value);
    } else if (n.kind === 'rxSuspense') {
      templateObserver.suspense(n.value);
    }
  }));
}

export function applyStrategy<T>(
  credentials$: Observable<StrategyCredentials>,
  getContext: (v?: any) => any,
  getCdRef: (k: RxNotification<T>) => ChangeDetectorRef
): (o$: Observable<RxNotification<T>>) => Observable<RxNotification<T>> {
  return notification$ => notification$.pipe(
    publish((n$) =>
      credentials$.pipe(
        switchMap((credentials) => n$.pipe(
          switchMap(notification => {
            const activeEmbeddedView = getCdRef(notification);
            const context = getContext(notification);
            const work = () => credentials.work(activeEmbeddedView, context, notification);
            return concat(of(notification), NEVER).pipe(
              credentials.behavior(work, context)
            );
          })
          )
        )
      )
    )
  );
}
