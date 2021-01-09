import {
  combineLatest,
  merge,
  Observable,
  of,
  ReplaySubject,
  Subject,
} from 'rxjs';
import {
  ChangeDetectorRef,
  EmbeddedViewRef,
  IterableDiffer,
  NgIterable,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef,
} from '@angular/core';
import { filter, map, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
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
    trackBy,
  } = config;
  const distinctBy = config?.distinctBy || ((a: T, b: T) => a === b);

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
    let count = 0;
    const positions = new Map<T, number>();

    return (o$: Observable<NgIterable<T>>) =>
      o$.pipe(
        map((items) => (items ? Array.from(items) : [])),
        withLatestFrom(strategy$),
        switchMap(([items, strategy]) => {

          const viewLength = viewContainerRef.length;
          let toRemoveCount = viewLength - items.length;
          const notifyParent = toRemoveCount > 0  || count !== items.length;
          count = items.length;

          const remove$ = [];
          let i = viewLength;
          while (i > 0 && toRemoveCount > 0) {
            toRemoveCount--;
            i--;
            remove$.push(
              of(i).pipe(
                strategy.behavior(() => {viewContainerRef.remove(i);}, {})
              )
            );
          }
          const parentNotify$ = notifyParent
                                ? strategy.behavior(() => {
              console.log('notify parent', (config.cdRef as any).context);
              strategy.work(
                config.cdRef,
                (config.cdRef as any).context || config.cdRef
              );
            }, (config.cdRef as any).context || config.cdRef)(of(null))
                                : of(null);
          return combineLatest([
            // support for Iterable<T> (e.g. `Map#values`)
            // parentNotify$,
            ...items.map((item, index) => {
              positions.set(item, index);
              const context = { count, index};

              return of(item).pipe(
                strategy.behavior(() => {
                  let view = viewContainerRef.get(index) as EmbeddedViewRef<C>;
                  // The items view is not created yet => create view + update context
                  if (!view) {
                    console.log('insert');
                    view = viewContainerRef.createEmbeddedView(
                      templateRef,
                      createViewContext(item),
                      index
                    );
                    view.context.setComputedContext(context);

                    view.reattach();
                    view.detectChanges();
                    view.detach();
                  }
                  // The items view is present => update context
                  else {
                    const entity = view.context.$implicit;
                    const trackById = trackBy(index, entity);
                    const currentId = trackBy(index, item);
                    const moved = trackById !== currentId;
                    const updated = !distinctBy(view.context.$implicit, item);
                    if (moved || updated) {

                      if (moved) {
                        console.log('move');
                        const oldPosition = positions.get(item);
                        if (positions.has(item) && positions.get(item) !== index) {
                          const oldView = viewContainerRef.get(oldPosition);
                          if (oldView) {
                            // console.log(oldView);
                            view = viewContainerRef.move(
                              oldView,
                              index
                            ) as EmbeddedViewRef<C>;
                            console.log('real move');
                          }
                        }
                      }
                      view.context.setComputedContext(context);
                      view.context.$implicit = item;
                      view.reattach();
                      view.detectChanges();
                      view.detach();
                    } else {
                      if(notifyParent) {
                        view.context.setComputedContext(context);
                        view.reattach();
                        view.detectChanges();
                        view.detach();
                      }
                    }
                  }

                }, {})
              );
            }),
            ...remove$,
            parentNotify$
          ]).pipe(filter(v => v != null))
        })
      );
  }

}
