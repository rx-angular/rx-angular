import {
  combineLatest,
  Observable,
  of,
  OperatorFunction,
  ReplaySubject,
} from 'rxjs';
import {
  ChangeDetectorRef,
  ElementRef,
  EmbeddedViewRef,
  NgIterable,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef,
  ViewRef,
  ɵdetectChanges as detectChanges,
  ɵmarkDirty as markDirty,
} from '@angular/core';
import {
  delay,
  filter,
  map,
  observeOn,
  startWith,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import {
  nameToStrategyCredentials,
  onStrategy,
} from '../render-strategies/utils/strategy-helper';
import { ngInputFlatten } from '../utils/rxjs/operators/ngInputFlatten';
import { asyncScheduler } from '../utils/zone-agnostic/rxjs/scheduler/async';
import { RxListViewComputedContext, RxListViewContext } from './model';
import { extractProjectionParentViewSet, extractProjectionViews, getTNode, renderProjectionParents } from './utils';
import { asap } from '../utils/zone-agnostic/rxjs/scheduler/asap';
import {
  StrategyCredentials,
  StrategyCredentialsMap,
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
  renderParent: boolean;
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
    renderParent,
    eRef,
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
  let tNode: any;

  return {
    nextStrategy(nextConfig: Observable<string>): void {
      strategyName$.next(nextConfig);
    },
    render(values$: Observable<NgIterable<T>>): Observable<any> {
      tNode = getTNode(cdRef, eRef.nativeElement);
      return values$.pipe(render());
    },
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
          const insertedOrRemoved = toRemoveCount > 0 || count !== items.length;
          const notifyParent = insertedOrRemoved && renderParent;
          count = items.length;
          const remove$ = [];
          let i = viewLength;
          while (i > 0 && toRemoveCount > 0) {
            toRemoveCount--;
            i--;
            remove$.push(
              onStrategy(
                i,
                strategy,
                (value, work, options) => removeView(value),
                {}
              )
            );
          }
          return combineLatest([
            ...items.map((item, index) => {
              positions.set(item, index);
              const context: RxListViewComputedContext = { count, index };
              // flag which tells if a view needs to be updated
              let doWork = false;
              return of(item).pipe(
                strategy.behavior(() => {
                  // get the reference of the current `EmbeddedViewRef` at the index of the item
                  let view = viewContainerRef.get(index) as EmbeddedViewRef<C>;
                  if (!view) {
                    // The items view is not created yet => create view + update context
                    view = insertView(item, index, context);
                    doWork = true;
                  } else {
                    // The items view is present => check what to do
                    // the current `T` of the `EmbeddedViewRef`
                    const entity = view.context.$implicit;
                    // the `identity` of the `EmbeddedViewRef`
                    const trackById = trackBy(index, entity);
                    // the `identity` of the current item `T`
                    const currentId = trackBy(index, item);
                    // an item is moved if the current `identity` of the `EmbeddedView` is not the same as the
                    // current item `T`
                    const moved = trackById !== currentId;
                    if (moved) {
                      const oldPosition = positions.get(item);
                      if (
                        positions.has(item) &&
                        positions.get(item) !== index
                      ) {
                        const oldView = <EmbeddedViewRef<C>>(
                          viewContainerRef.get(oldPosition)
                        );
                        if (oldView) {
                          view = moveView(oldView, index);
                        }
                      }
                      updateViewContext(view, context, item);
                      doWork = true;
                    } else {
                      const updated = !distinctBy(view.context.$implicit, item);
                      if (updated) {
                        updateViewContext(view, context, item);
                        doWork = true;
                      } else if (insertedOrRemoved) {
                        view.context.setComputedContext(context);
                      }
                    }
                  }
                  if (doWork) {
                    view.reattach();
                    view.detectChanges();
                    view.detach();
                  }
                }, {})
              );
            }),
            ...remove$,
            renderParent
              ? onStrategy(
                  i,
                  strategy,
                  (value, work, options) => work(cdRef, options.scope),
                  { scope }
                )
              : [],
          ]).pipe(
            // @NOTICE: dirty hack to do ??? ask @HoebblesB
            delay(0, asap),
            switchMap((v) => {
              if (!renderParent) {
                return of(v);
              }
              const parentElements = extractProjectionParentViewSet(cdRef, tNode);
              const behaviors = [];
              for (const el of parentElements.values()) {
                behaviors.push(
                  onStrategy(
                    el,
                    strategy,
                    (value, work, options) => {
                      detectChanges(el);
                    },
                    { scope: el }
                  )
                )
              }
              if (behaviors.length === 0) {
                return of(v);
              }
              behaviors.push(
                onStrategy(
                  null,
                  strategy,
                  (value, work, options) => work(cdRef, options.scope),
                  { scope: (cdRef as any).context || cdRef }
                )
              );
              return combineLatest(behaviors).pipe(
                map(() => null),
                filter((_v) => _v !== null),
                startWith(v)
              );
            }),
            filter((v) => v != null),
            // tap((v) => console.log('end', v))
          );
        })
      );
  }

  function updateViewContext(
    view: EmbeddedViewRef<C>,
    context: RxListViewComputedContext,
    item: T
  ): void {
    view.context.setComputedContext(context);
    view.context.$implicit = item;
  }

  function moveView(
    view: EmbeddedViewRef<C>,
    index: number
  ): EmbeddedViewRef<C> {
    return viewContainerRef.move(view, index) as EmbeddedViewRef<C>;
  }

  function removeView(index: number): void {
    // TODO: evaluate viewCache with `detach` instead of `remove` viewCache.push();
    viewContainerRef.remove(index);
  }

  function insertView(
    item: T,
    index: number,
    context: RxListViewComputedContext
  ): EmbeddedViewRef<C> {
    // TODO: evaluate viewCache with `detach` instead of `remove` viewCache.push();
    /*const existingView: EmbeddedViewRef<C> = viewCache.pop();
    let newView = existingView;
    if (existingView) {
      viewContainerRef.insert(existingView, index);
    } else {
      newView = viewContainerRef.createEmbeddedView(
        templateRef,
        createViewContext(item),
        index
      );
    }*/
    const newView = viewContainerRef.createEmbeddedView(
      templateRef,
      createViewContext(item),
      index
    );
    updateViewContext(newView, context, item);
    return newView;
  }
}
