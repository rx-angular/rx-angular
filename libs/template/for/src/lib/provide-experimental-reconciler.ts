import { NgIterable, Provider } from '@angular/core';
import { onStrategy } from '@rx-angular/cdk/render-strategies';
import { reconcile, RxLiveCollection } from '@rx-angular/cdk/template';
import { combineLatest, concat, Observable, of } from 'rxjs';
import {
  catchError,
  ignoreElements,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { INTERNAL_RX_FOR_RECONCILER_TOKEN } from './for.config';
import { ReconcileFactoryOptions } from './reconcile-factory';

export function provideExperimentalRxForReconciliation(): Provider {
  return {
    provide: INTERNAL_RX_FOR_RECONCILER_TOKEN,
    useFactory:
      () =>
      <T, U extends NgIterable<T> = NgIterable<T>>(
        options: ReconcileFactoryOptions<T, U>,
      ) => {
        const {
          values$,
          strategy$,
          viewContainerRef,
          template,
          strategyProvider,
          errorHandler,
          createViewContext,
          updateViewContext,
          cdRef,
          trackBy,
          parent,
          patchZone,
        } = options;
        const liveCollection = new RxLiveCollection<T>(
          viewContainerRef,
          template,
          strategyProvider,
          createViewContext,
          updateViewContext,
        );
        return combineLatest([
          values$,
          strategy$.pipe(startWith(strategyProvider.primaryStrategy)),
        ]).pipe(
          switchMap(([iterable, strategyName]) => {
            if (iterable == null) {
              iterable = <U>[];
            }
            if (!iterable[Symbol.iterator]) {
              throw new Error(
                `Error trying to diff '${iterable}'. Only arrays and iterables are allowed`,
              );
            }
            const strategy = strategyProvider.strategies[strategyName]
              ? strategyName
              : strategyProvider.primaryStrategy;
            liveCollection.reset();
            reconcile(liveCollection, iterable, trackBy);
            liveCollection.updateIndexes();
            return <Observable<U>>liveCollection.flushQueue(strategy).pipe(
              (o$) =>
                parent && liveCollection.needHostUpdate
                  ? concat(
                      o$,
                      onStrategy(
                        null,
                        strategyProvider.strategies[strategy],
                        (_, work, options) => {
                          work(cdRef, options.scope);
                        },
                        {
                          scope: (cdRef as any).context ?? cdRef,
                          ngZone: patchZone,
                        },
                      ).pipe(ignoreElements()),
                    )
                  : o$,
              map(() => iterable),
            );
          }),
          catchError((e) => {
            errorHandler.handleError(e);
            return of(null);
          }),
        );
      },
  };
}
