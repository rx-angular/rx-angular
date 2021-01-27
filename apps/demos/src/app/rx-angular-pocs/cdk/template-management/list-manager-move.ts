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
  EmbeddedViewRef, IterableChangeRecord, IterableDiffer, IterableDiffers,
  NgIterable, NgZone,
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
import { isObjectGuard } from '../utils/guards';
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

const enum ListChange {
  insert,
  move,
  update,
  context
}

export function createListManager<T, C extends RxListViewContext<T>>(config: {
  cdRef: ChangeDetectorRef;
  ngZone: NgZone;
  iterableDiffers: IterableDiffers;
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
    ngZone,
    iterableDiffers,
    renderParent,
    eRef,
  } = config;
  const distinctBy = config?.distinctBy || ((a: T, b: T) => a === b);
  const scope = (cdRef as any).context || cdRef;

  const strategyName$ = new ReplaySubject<Observable<string>>(1);
  const strategy$: Observable<StrategyCredentials> = strategyName$.pipe(
    ngInputFlatten(),
    startWith(defaultStrategyName),
    nameToStrategyCredentials(strategies, defaultStrategyName)
  );
  let tNode: any;
  let notifyParent = false;
  let isObjectType = false;
  const itemViewCache = new Map<any, EmbeddedViewRef<C>>();
  const itemPositionCache = new Map<any, number>();
  const itemCache = new Map<any, T>();
  const differ: IterableDiffer<T> = iterableDiffers.find([]).create(trackBy);

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
    return (o$: Observable<NgIterable<T>>): Observable<any> =>
      o$.pipe(
        // without moving:
        map(iterable => ({
          changes: differ.diff(iterable),
          items: iterable != null && Array.isArray(iterable) ? iterable : []
        })),
        withLatestFrom(strategy$),
        filter(([{ changes }]) => !!changes),
        switchMap(([{changes, items}, strategy]) => {
          /*console.log('items',  items);
          console.log('itemViewPositionCache',  itemViewPositionCache.values());*/
          const viewLength = viewContainerRef.length;
          let toRemoveCount = viewLength - items.length;
          let insertedOrRemoved = toRemoveCount > 0 || count !== items.length;
          notifyParent = notifyParent || (insertedOrRemoved && renderParent);
          count = items.length;
          const remove$ = [];
          const inserts: number[] = [];
          const updates: number[] = [];
          const contexts: number[] = [];
          const moves: [number, number][] = [];
          const changedIdxs = new Set<number>();
          changes.forEachOperation((record, adjustedPreviousIndex, currentIndex) => {
            const view = viewContainerRef.get(record.currentIndex) as EmbeddedViewRef<C>;
            if (record.previousIndex == null || !view) {
              changedIdxs.add(record.currentIndex);
              inserts.push(record.currentIndex);
            } else if (currentIndex == null) {
              remove$.push(
                onStrategy(
                  record.currentIndex,
                  strategy,
                  (value, work, options) => removeView(value),
                  {}
                )
              );
            } else if (adjustedPreviousIndex !== null) {
              changedIdxs.add(currentIndex);
              moves.push([currentIndex, adjustedPreviousIndex]);
            }
          });
          items.forEach((item, index) => {
            if (!changedIdxs.has(index)) {
              const view = viewContainerRef.get(index) as EmbeddedViewRef<C>;
              // TODO: fix distinct bug
              const updated = !distinctBy(view.context.$implicit, item);
              if (updated) {
                updates.push(index);
              } else {
                if ((view.context as any).count !== count ||
                  (view.context as any).index !== index) {
                  contexts.push(index);
                }
              }
            }
          });
          return combineLatest([
            ...remove$,
            ...inserts.map(index => {
              const item = items[index];
              const context: RxListViewComputedContext = { count, index };
              return onStrategy(
                index,
                strategy,
                (value, work, options) => {
                  const view = insertView(item, index, context);
                  const itemTrackById = trackBy(index, item);
                  itemViewCache.set(itemTrackById, view);
                  itemPositionCache.set(itemTrackById, index);
                  view.detectChanges();
                },
                {}
              );
            }),
            ...moves.map(([index, oldIndex]) => {
              const item = items[index];
              const context: RxListViewComputedContext = { count, index };
              return onStrategy(
                index,
                strategy,
                (value, work, options) => {
                  const oldView = <EmbeddedViewRef<C>>viewContainerRef.get(oldIndex);
                  const view = moveView(
                    oldView,
                    index
                  );
                  updateViewContext(view, context, item);
                  view.detectChanges();
                },
                {}
              );
            }),
            ...updates.map(index => {
              const item = items[index];
              const context: RxListViewComputedContext = { count, index };
              return onStrategy(
                index,
                strategy,
                (value, work, options) => {
                  const view = <EmbeddedViewRef<C>>viewContainerRef.get(index);
                  updateViewContext(view, context, item);
                  view.detectChanges();
                },
                {}
              );
            }),
            ...contexts.map(index => {
              const context: RxListViewComputedContext = { count, index };
              return onStrategy(
                index,
                strategy,
                (value, work, options) => {
                  const view = <EmbeddedViewRef<C>>viewContainerRef.get(index);
                  view.context.setComputedContext(context);
                  view.detectChanges();
                },
                {}
              );
            }),
            insertedOrRemoved
              ? onStrategy(
                  2,
                  strategy,
                  (value, work, options) => {
                    work(cdRef, options.scope)
                  },
                  { scope }
                ).pipe(map(() => null), filter(v => v != null), startWith(null))
              : [],
          ]).pipe(
            // @NOTICE: dirty hack to do ??? ask @HoebblesB
            delay(0, asap),
            switchMap((v) => {
              if (!notifyParent) {
                return of(v);
              }
              notifyParent = false;
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
                );
              }
              if (behaviors.length === 0) {
                return of(v);
              }
              behaviors.push(
                onStrategy(
                  null,
                  strategy,
                  (value, work, options) => work(cdRef, options.scope),
                  { scope }
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

  function clone(item: T): T {
    if (isObjectType) {
      return { ...item };
    }
    return item;
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
    itemViewCache.delete(viewContainerRef.get(index));
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
