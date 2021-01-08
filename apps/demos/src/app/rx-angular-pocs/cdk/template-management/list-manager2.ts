import { combineLatest, merge, Observable, of, ReplaySubject } from 'rxjs';
import {
  ChangeDetectorRef,
  EmbeddedViewRef,
  IterableDiffer,
  NgIterable,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef,
} from '@angular/core';
import { map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  StrategyCredentials,
  StrategyCredentialsMap,
} from '../render-strategies/model';
import { nameToStrategyCredentials } from '../render-strategies/utils/strategy-helper';
import { ngInputFlatten } from '../utils/rxjs/operators/ngInputFlatten';
import { RxListViewContext } from './model';

export interface ListManager<T, C> {
  nextStrategy: (config: string | Observable<string>) => void;
  render(changes$: Observable<NgIterable<T>>): Observable<any>;
}

export type CreateViewContext<T, C> = (item: T) => C;
export type DistinctByFunction<T> = (oldItem: T, newItem: T) => any;

export function createListManager<T, C extends RxListViewContext<T>>(config: {
  cdRef: ChangeDetectorRef;
  strategies: StrategyCredentialsMap;
  defaultStrategyName: string;
  viewContainerRef: ViewContainerRef;
  templateRef: TemplateRef<C>;
  createViewContext: CreateViewContext<T, C>;
  trackBy: TrackByFunction<T>;
  distinctBy?: DistinctByFunction<T>;
}): ListManager<T, C> {
  const {
    viewContainerRef,
    templateRef,
    createViewContext,
    defaultStrategyName,
    strategies,
    trackBy
  } = config;
  const distinctBy = config?.distinctBy || ((a: T, b: T) => a !== b);

  const strategyName$ = new ReplaySubject<Observable<string>>(1);
  const strategy$: Observable<StrategyCredentials> = strategyName$.pipe(
    ngInputFlatten(),
    startWith(defaultStrategyName),
    nameToStrategyCredentials(strategies, defaultStrategyName)
  );

  return {
    nextStrategy(nextConfig: Observable<string>): void {
      strategyName$.next(nextConfig);
    },
    render(values$: Observable<NgIterable<T>>): Observable<any> {
      return values$.pipe(_render());
    },
  };

  function _render() {
    return (o$: Observable<NgIterable<T>>) =>
      o$.pipe(
        map((items) => (items ? Array.from(items) : [])),
        withLatestFrom(strategy$),
        switchMap(([items, strategy]) => {
          const viewLength = viewContainerRef.length;
          let toRemoveCount = viewLength - items.length;
          const remove$ = [];
          let i = viewContainerRef.length;
          while (i > 0 && toRemoveCount > 0) {
            toRemoveCount--; i--;
            remove$.push(
              of(null).pipe(
                strategy.behavior(() => {
                  viewContainerRef.remove(i);
                }, {})
              )
            );
          }
          for (let removeI = 0; removeI < toRemoveCount; removeI++) {
            remove$.push(
              of(null).pipe(
                strategy.behavior(() => {
                  viewContainerRef.remove(removeI + viewLength - 1);
                }, {})
              )
            );
          }
          return combineLatest([
            // support for Iterable<T> (e.g. `Map#values`)
            ...items.map((item, index) => {
              return of(item).pipe(
                strategy.behavior(() => {
                  let view = viewContainerRef.get(index) as EmbeddedViewRef<C>;
                  // The items view is not created yet => create view + update context
                  if (!view) {
                    view = viewContainerRef.createEmbeddedView(
                      templateRef,
                      createViewContext(item),
                      index
                    );
                  }
                  // The items view is present => update context
                  else {
                    const entity = view.context.$implicit;
                    const trackById = trackBy(index, entity);
                    const currentId = trackBy(index, item);
                    if (trackById !== currentId || distinctBy(view.context.$implicit , item)) {
                      view.context.$implicit = item;
                    }
                  }
                  // Update viewContext variable props
                  view.context.setComputedContext({
                    count: items.length,
                    index,
                  });
                  view.reattach();
                  view.detectChanges();
                  view.detach();
                }, item)
              );
            }),
            ...remove$,
          ]);
        })
        // tap(() => {notifyParent$.next(notifyParent);})
      );
  }
}
