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
  IterableChangeRecord,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  NgZone,
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
import {
  extractProjectionParentViewSet,
  extractProjectionViews,
  getTNode,
  renderProjectionParents,
} from './utils';
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
  remove,
  move,
  update,
  context,
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
  const differ: IterableDiffer<T> = iterableDiffers.find([]).create(trackBy);
  //               trackBy, type,  payload
  let changesArr: [any, ListChange, any][];
  let partiallyFinished = false;

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
        map((iterable) => {
          // console.log('data', [...iterable]);
          if (partiallyFinished) {
            let _iterable = [];
            for (let i = 0, ilen = viewContainerRef.length; i < ilen; i++) {
              const viewRef = <EmbeddedViewRef<C>>viewContainerRef.get(i);
              _iterable[i] = viewRef.context.$implicit;
            }
            // console.log('fuck the differ', _iterable);
            // console.log('fuck the differ', _iterable);
            differ.diff(_iterable);
          }
          return {
            changes: differ.diff(iterable),
            items: iterable != null && Array.isArray(iterable) ? iterable : [],
          }
        }),
        withLatestFrom(strategy$),
        // filter(([{ changes }]) => !!changes),
        switchMap(([{ changes, items }, strategy]) => {
          console.log(changes);
          if (!changes) {
            console.log('EXIT MOFO')
            return of(null);
          }
          /*console.log('items',  items);
          console.log('itemViewPositionCache',  itemViewPositionCache.values());*/
          partiallyFinished = true;
          const viewLength = viewContainerRef.length;
          let toRemoveCount = viewLength - items.length;
          let insertedOrRemoved = toRemoveCount > 0 || count !== items.length;
          notifyParent = notifyParent || (insertedOrRemoved && renderParent);
          count = items.length;
          const changedIdxs = new Set<T>();
          changesArr = [];
          // console.log('changes happened', items);
          // forEachOperation only contains insert, move and remove
          changes.forEachOperation(
            (record, adjustedPreviousIndex, currentIndex) => {
              if (record.previousIndex == null) {
                // insert
                // console.log('schedule insert', [record.trackById, currentIndex === null ? undefined : currentIndex]);
                changesArr.push([
                  record.trackById,
                  ListChange.insert,
                  [
                    record.item,
                    currentIndex === null ? undefined : currentIndex,
                  ]
                ]);
                changedIdxs.add(record.item);
                // console.log('insert', record.item);
              } else if (currentIndex == null) {
                // remove
                // console.log('schedule remove', [record.trackById, record.previousIndex]);
                changesArr.push([
                  record.trackById,
                  ListChange.remove,
                  adjustedPreviousIndex === null ? undefined : adjustedPreviousIndex
                ]);
                changedIdxs.add(record.item);
              } else if (adjustedPreviousIndex !== null) {
                // move
                // console.log('schedule move', [currentIndex, adjustedPreviousIndex])
                changesArr.push([
                  record.trackById,
                  ListChange.move,
                  [
                    record.item,
                    currentIndex,
                    adjustedPreviousIndex,
                  ]
                ]);
                changedIdxs.add(record.item);
              }
            }
          );
          changes.forEachIdentityChange((record) => {
            // console.log('schedule update', [record.item, record.currentIndex])
            changesArr.push([
              record.trackById,
              ListChange.update,
              [
                record.item,
                record.currentIndex
              ]
            ]);
            changedIdxs.add(record.item);
            /*const updated = !distinctBy(view.context.$implicit, item);
            if (updated) {
              updates.set(item, index);
            } else {
              if ((view.context as any).count !== count ||
                (view.context as any).index !== index) {
                contexts.set(item, index);
              }
            }*/
          });
          items.forEach((item, index) => {
            if (!changedIdxs.has(item)) {
              const trackById = trackBy(index, item);
              // console.log('schedule context', [item, index])
              changesArr.push([
                trackById,
                ListChange.context,
                [item, index]
              ]);
            }
          });
          const applyChanges$ =
            changesArr.length > 0 ?
            changesArr.map(change => {
              return onStrategy(
                change,
                strategy,
                (_change) => {
                  const type = _change[1];
                  const payload = _change[2];
                  switch (type) {
                    case ListChange.insert:
                      const item = payload[0];
                      const index = payload[1];
                      const view = insertView(item, index, {
                        count,
                        index,
                      });
                      view.detectChanges();
                      break;
                    case ListChange.move:
                      const __item = payload[0];
                      const __index = payload[1];
                      const oldIndex = payload[2];
                      const oldView = <EmbeddedViewRef<C>>(
                        viewContainerRef.get(oldIndex)
                      );
                      const __view = moveView(oldView, __index);
                      updateViewContext(
                        __view,
                        {
                          count,
                          index: __index,
                        },
                        __item
                      );
                      __view.detectChanges();
                      break;
                    case ListChange.remove:
                      removeView(payload);
                      break;
                    case ListChange.update:
                      const _item = payload[0];
                      const _index = payload[1];
                      const _view = <EmbeddedViewRef<C>>(
                        viewContainerRef.get(_index)
                      );
                      updateViewContext(
                        _view,
                        {
                          count,
                          index: _index,
                        },
                        _item
                      );
                      _view.detectChanges();
                      break;
                    case ListChange.context:
                      const ___index = payload[1];
                      const ___view = <EmbeddedViewRef<C>>(
                        viewContainerRef.get(___index)
                      );
                      ___view.context.setComputedContext({
                        count, index: ___index
                      });
                      ___view.detectChanges();
                      break;
                  }
                },
                {}
              )
            }) : [of(null)];
          return combineLatest([
            ...applyChanges$,
            insertedOrRemoved
              ? onStrategy(
                  2,
                  strategy,
                  (value, work, options) => {
                    work(cdRef, options.scope);
                  },
                  { scope }
                ).pipe(
                  map(() => null),
                  filter((v) => v != null),
                  startWith(null)
                )
              : of(null),
          ]).pipe(
            tap(() => partiallyFinished = false),
            // @NOTICE: dirty hack to do ??? ask @HoebblesB
            delay(0, asap),
            switchMap((v) => {
              if (!notifyParent) {
                return of(v);
              }
              notifyParent = false;
              const parentElements = extractProjectionParentViewSet(
                cdRef,
                tNode
              );
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
            tap((v) => {
              // differ.diff(items);
            }),
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
