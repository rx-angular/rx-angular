import { map, publish, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { concat, NEVER, Observable, of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import {
  StrategyCredentials,
  RxNotification,
  RxNotificationKind,
  CustomStrategyCredentialsMap, RenderWork
} from '@rx-angular/cdk';
import { RxTemplateObserver } from '@rx-angular/template';

export function nameToStrategyCredentials(strategies: CustomStrategyCredentialsMap<string>, defaultStrategyName: string) {
  return (o$: Observable<string>): Observable<StrategyCredentials> => o$.pipe(
    map(name => Object.keys(strategies).includes(name) ? strategies[name] : strategies[defaultStrategyName])
  );
}

export function mergeStrategies(...strategiesArray: Array<CustomStrategyCredentialsMap<string>>): CustomStrategyCredentialsMap<string> {
  return strategiesArray.reduce((c, a) => {
    // tslint:disable-next-line:variable-name
    const _a = Array.isArray(a) ? strategiesArray.reduce((_c, __a) => ({ ..._c, ...__a }), {}) : a || {};
    return { ...c, ..._a };
  }, {});
}

export function observeTemplateByNotificationKind<U>(templateObserver: RxTemplateObserver<U>) {
  return (o$: Observable<RxNotification<U>>): Observable<RxNotification<U>> => o$.pipe(
    tap((n: RxNotification<U>) => {
    if (n.kind === RxNotificationKind.error) {
      templateObserver.error(n.error);
    } else if (n.kind === RxNotificationKind.complete) {
      templateObserver.complete();
    } else if (n.kind === RxNotificationKind.next) {
      templateObserver.next(n.value);
    } else if (n.kind === RxNotificationKind.suspense) {
      templateObserver.suspense(n.value);
    }
  })
  );
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

export function applyStrategy2<T>(
  strategy$: Observable<StrategyCredentials>,
  workFactory: (value: T, work: RenderWork) => void,
  context: any
) {
  return (o$: Observable<T>) =>
    o$.pipe(
      withLatestFrom(strategy$),
      switchMap(([value, strategy]) => {
        return strategy.behavior(
          () => workFactory(value, strategy.work),
          context
        )(of(value));
      })
    );
}

export function onStrategy<T>(
  value: T,
  strategy: StrategyCredentials,
  workFactory: (value: T, work: RenderWork, options: {scope?: any}) => void,
  options: {scope?: any} = {}
) {
  return of(value).pipe(
        strategy.behavior(
          () => workFactory(value, strategy.work, options),
          options.scope || {}
        )
    );
}
