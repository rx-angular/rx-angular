import {
  combineLatest,
  EMPTY,
  Observable,
  of,
  OperatorFunction,
  ReplaySubject
} from 'rxjs';
import {
  ChangeDetectorRef,
  ElementRef,
  EmbeddedViewRef,
  NgIterable,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef, ViewRef,
  ɵdetectChanges as detectChanges
} from '@angular/core';
import {
  delay,
  filter,
  map,
  startWith,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import {
  nameToStrategyCredentials,
  onStrategy
} from '../render-strategies/utils/strategy-helper';
import { ngInputFlatten } from '../utils/rxjs/operators/ngInputFlatten';
import { RxListViewComputedContext, RxListViewContext } from './model';
import { extractParentElements } from './utils';
import { asap } from '../utils/zone-agnostic/rxjs/scheduler/asap';
import {
  StrategyCredentials,
  StrategyCredentialsMap
} from '../render-strategies/model';

export interface ListManager<T, C> {
  nextStrategy: (config: string | Observable<string>) => void;

  render(changes$: Observable<NgIterable<T>>): Observable<any>;
}

export type CreateViewContext<T, C> = (item: T) => C;
export type DistinctByFunction<T> = (oldItem: T, newItem: T) => any;

export function createListManager<T, C extends RxListViewContext<T>>(config: {
  cdRef: ChangeDetectorRef;
  eRef: ElementRef;
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
    cdRef,
    eRef
  } = config;
  const distinctBy = config?.distinctBy || ((a: T, b: T) => a === b);
  const scope = (cdRef as any).context || cdRef;
  const viewCache = [];

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
      return values$.pipe(render());
    }
  };

  function render(): OperatorFunction<NgIterable<T>, any> {
    let count = 0;
    const positions = new Map<T, number>();

    return (o$: Observable<NgIterable<T>>): Observable<any> =>
      o$.pipe(
        map((items) => (items ? Array.from(items) : [])),
        withLatestFrom(strategy$),
        switchMap(([items, strategy]) => {
          const viewLength = viewContainerRef.length;
          let toRemoveCount = viewLength - items.length;
          const notifyParent = toRemoveCount > 0 || count !== items.length;
          count = items.length;
          const remove$ = [];
          let i = viewLength;
          while (i > 0 && toRemoveCount > 0) {
            toRemoveCount--;
            i--;
            remove$.push(
              onStrategy(i, strategy, (value, work) => removeView(value), {})
            );
          }
          return combineLatest([
            ...items.map((item, index) => {
              positions.set(item, index);
              const context: RxListViewComputedContext = { count, index };
              return of(item).pipe(
                strategy.behavior(() => {
                  let view = viewContainerRef.get(index) as EmbeddedViewRef<C>;
                  // The items view is not created yet => create view + update context
                  if (!view) {
                    // console.log('insert');
                    view = insertView(item, index, context);

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
                        // console.log('move');
                        const oldPosition = positions.get(item);
                        if (
                          positions.has(item) &&
                          positions.get(item) !== index
                        ) {
                          const oldView = viewContainerRef.get(oldPosition);
                          if (oldView) {
                            // console.log(oldView);
                            view = moveView(oldView, index);
                            // console.log('real move');
                          }
                        }
                      }
                      view.context.setComputedContext(context);
                      view.context.$implicit = item;
                      view.reattach();
                      view.detectChanges();
                      view.detach();
                    } else {
                      if (notifyParent) {
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
            notifyParent
              ? onStrategy(
              i,
              strategy,
              (value, work) => strategy.work(cdRef, scope),
              scope
              ).pipe(startWith(null))
              : []
          ]).pipe(
            // @NOTICE: dirty hack to do ??? ask @HoebblesB
            delay(0, asap),
            switchMap((v) => {
              const parentElements = extractParentElements(cdRef, eRef);
              return notifyParent
                ? combineLatest([
                  // ViewQuery Notification
                  ...Array.from(parentElements).map((el) =>
                    onStrategy(
                      el,
                      strategy,
                      (value, work) => el && detectChanges(el),
                      scope
                    )
                  ),
                  // Parent Notification
                  onStrategy(
                    null,
                    strategy,
                    (value, work) => strategy.work(cdRef),
                    scope
                  )
                ]).pipe(
                  map(() => null),
                  filter((v) => v !== null),
                  startWith(v)
                )
                : of(v);
            }),
            filter((v) => v != null),
            tap((v) => console.log('end', v))
          );
        })
      );
  }

  function moveView(view: ViewRef, index: number): EmbeddedViewRef<C> {
    return viewContainerRef.move(view, index) as EmbeddedViewRef<C>;
  }

  function removeView(index): void {
    viewCache.push(viewContainerRef.remove(index));
  }

  function insertView(item, index, context): EmbeddedViewRef<C> {
    const existingView: EmbeddedViewRef<C> = viewCache.pop();
    let newView = existingView;
    if (existingView) {
      existingView.context.setComputedContext(context as any);
      viewContainerRef.insert(existingView, index);
    } else {
      newView = viewContainerRef.createEmbeddedView(
        templateRef,
        createViewContext(item),
        index
      );
    }
    newView.context.setComputedContext(context);
    return newView;
  }
}


