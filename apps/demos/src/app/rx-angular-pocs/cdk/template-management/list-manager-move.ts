import {
  combineLatest,
  concat,
  Observable,
  of,
  OperatorFunction,
  ReplaySubject,
} from 'rxjs';
import {
  ChangeDetectorRef,
  ElementRef,
  EmbeddedViewRef,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  NgZone,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef,
  ɵdetectChanges as detectChanges,
} from '@angular/core';
import {
  delay,
  filter,
  ignoreElements,
  map,
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
import { RxListViewComputedContext, RxListViewContext } from './model';
import { extractProjectionParentViewSet, getTNode } from './utils';
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
    cdRef: injectingViewCdRef,
    ngZone,
    iterableDiffers,
    renderParent,
    eRef,
  } = config;
  const injectingViewContext =
    (injectingViewCdRef as any).context || injectingViewCdRef;
  const scopeOnInjectingViewContext = { scope: injectingViewContext };

  const strategyName$ = new ReplaySubject<Observable<string>>(1);
  const strategy$: Observable<StrategyCredentials> = strategyName$.pipe(
    ngInputFlatten(),
    startWith(defaultStrategyName),
    nameToStrategyCredentials(strategies, defaultStrategyName)
  );
  let tNode: any;
  let notifyParent = false;
  const differ: IterableDiffer<T> = iterableDiffers.find([]).create(trackBy);
  //               type,  payload
  let changesArr: [ListChange, any][];
  let partiallyFinished = false;

  return {
    nextStrategy(nextConfig: Observable<string>): void {
      strategyName$.next(nextConfig);
    },
    render(values$: Observable<NgIterable<T>>): Observable<any> {
      tNode = getTNode(injectingViewCdRef, eRef.nativeElement);
      return values$.pipe(render());
    },
  };

  function render(): OperatorFunction<NgIterable<T>, any> {
    let count = 0;
    return (o$: Observable<NgIterable<T>>): Observable<any> =>
      o$.pipe(
        // map iterable to latest diff
        map((iterable) => {
          if (partiallyFinished) {
            const currentIterable = [];
            for (let i = 0, ilen = viewContainerRef.length; i < ilen; i++) {
              const viewRef = <EmbeddedViewRef<C>>viewContainerRef.get(i);
              currentIterable[i] = viewRef.context.$implicit;
            }
            differ.diff(currentIterable);
          }
          return {
            changes: differ.diff(iterable),
            items: iterable != null && Array.isArray(iterable) ? iterable : [],
          };
        }),
        withLatestFrom(strategy$),
        // Cancel old renders
        switchMap(([{ changes, items }, strategy]) => {
          if (!changes) {
            return [];
          }
          const insertedOrRemoved = getInsertOrRemoveState(items, count);
          const applyChanges$ = getObservablesFromChangesArray(
            getChangesArray(changes, items),
            strategy,
            count
          );
          partiallyFinished = true;
          notifyParent = notifyParent || (insertedOrRemoved && renderParent);
          count = items.length;

          return concat(
            // emit after all changes are rendered
            combineLatest([...applyChanges$]),
            // emit if parent needs notification
            getParentNotifiers(insertedOrRemoved, strategy)
          ).pipe(
            tap(() => (partiallyFinished = false)),
            // @NOTICE: dirty hack to do TNode thingy ??? ask @HoebblesB
            delay(0, asap),
            switchMap((v) => {
              if (!notifyParent) {
                return of(v);
              }
              notifyParent = false;
              const parentElements = extractProjectionParentViewSet(
                injectingViewCdRef,
                tNode
              );
              const behaviors = [];
              for (const parentComponent of parentElements.values()) {
                behaviors.push(
                  onStrategy(
                    parentComponent,
                    strategy,
                    // Here we CD the parent to update their projected views scenarios
                    (value, work, options) => detectChanges(parentComponent),
                    { scope: parentComponent }
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
                  (value, work, options) =>
                    work(injectingViewCdRef, options.scope),
                  scopeOnInjectingViewContext
                )
              );
              return combineLatest(behaviors).pipe(
                ignoreElements(),
                startWith(v)
              );
            }),
            filter((v) => v != null)
          );
        })
      );
  }

  function getInsertOrRemoveState(items: T[], count: number): boolean {
    const viewLength = viewContainerRef.length;
    const toRemoveCount = viewLength - items.length;
    return toRemoveCount > 0 || count !== items.length;
  }

  function getInsertChange(item: T, currentIndex: number): [ListChange, any] {
    return [
      ListChange.insert,
      [item, currentIndex === null ? undefined : currentIndex],
    ];
  }

  function getRemoveChange(
    item: T,
    adjustedPreviousIndex: number
  ): [ListChange, any] {
    return [
      ListChange.remove,
      adjustedPreviousIndex === null ? undefined : adjustedPreviousIndex,
    ];
  }

  function getMoveChange(
    item: T,
    currentIndex: number,
    adjustedPreviousIndex: number
  ): [ListChange, any] {
    return [ListChange.move, [item, currentIndex, adjustedPreviousIndex]];
  }

  function getUpdateChange(item: T, currentIndex: number): [ListChange, any] {
    return [ListChange.update, [item, currentIndex]];
  }

  function getUnchangedChange(item: T, index: number): [ListChange, any] {
    return [ListChange.context, [item, index]];
  }

  function getChangesArray(
    changes: IterableChanges<T>,
    items: T[]
  ): [ListChange, any][] {
    const changedIdxs = new Set<T>();
    changesArr = [];
    changes.forEachOperation((record, adjustedPreviousIndex, currentIndex) => {
      const item = record.item;
      if (record.previousIndex == null) {
        // insert
        changesArr.push(getInsertChange(item, currentIndex));
        changedIdxs.add(item);
      } else if (currentIndex == null) {
        // remove
        changesArr.push(getRemoveChange(item, adjustedPreviousIndex));
        changedIdxs.add(item);
      } else if (adjustedPreviousIndex !== null) {
        // move
        changesArr.push(
          getMoveChange(item, currentIndex, adjustedPreviousIndex)
        );
        changedIdxs.add(item);
      }
    });
    changes.forEachIdentityChange((record) => {
      const item = record.item;
      changesArr.push(getUpdateChange(item, record.currentIndex));
      changedIdxs.add(item);
    });
    items.forEach((item, index) => {
      if (!changedIdxs.has(item)) {
        changesArr.push(getUnchangedChange(item, index));
      }
    });
    return changesArr;
  }

  function getParentNotifiers(
    insertedOrRemoved: boolean,
    strategy
  ): Observable<never> {
    return insertedOrRemoved
      ? onStrategy(
          null,
          strategy,
          (value, work, options) => {
            work(injectingViewCdRef, options.scope);
          },
          scopeOnInjectingViewContext
        ).pipe(ignoreElements())
      : (([] as unknown) as Observable<never>);
  }

  function getObservablesFromChangesArray(
    changes: [ListChange, any][],
    strategy: StrategyCredentials,
    count: number
  ) {
    return changes.length > 0
      ? changes.map((change) => {
          return onStrategy(
            change,
            strategy,
            (_change) => {
              const type = _change[0];
              const payload = _change[1];
              switch (type) {
                case ListChange.insert:
                  insertView(payload[0], payload[1], count);
                  break;
                case ListChange.move:
                  moveView(payload[2], payload[0], payload[1], count);
                  break;
                case ListChange.remove:
                  removeView(payload);
                  break;
                case ListChange.update:
                  updateView(payload[0], payload[1], count);
                  break;
                case ListChange.context:
                  updateUnchangedContext(payload[1], count);
                  break;
              }
            },
            {}
          );
        })
      : [of(null)];
  }

  function updateViewContext(
    view: EmbeddedViewRef<C>,
    context: RxListViewComputedContext,
    item: T
  ): void {
    view.context.setComputedContext(context);
    view.context.$implicit = item;
  }

  function updateUnchangedContext(index: number, count: number) {
    const view = <EmbeddedViewRef<C>>viewContainerRef.get(index);
    view.context.setComputedContext({
      count,
      index,
    });
    view.detectChanges();
  }

  function moveView(
    oldIndex: number,
    item: T,
    index: number,
    count: number
  ): void {
    const oldView = <EmbeddedViewRef<C>>viewContainerRef.get(oldIndex);
    const view = viewContainerRef.move(oldView, index) as EmbeddedViewRef<C>;
    updateViewContext(
      view,
      {
        count,
        index,
      },
      item
    );
    view.detectChanges();
  }

  function updateView(item: T, index: number, count: number): void {
    const view = <EmbeddedViewRef<C>>viewContainerRef.get(index);
    updateViewContext(
      <EmbeddedViewRef<C>>viewContainerRef.get(index),
      {
        count,
        index,
      },
      item
    );
    view.detectChanges();
  }

  function removeView(index: number): void {
    viewContainerRef.remove(index);
  }

  function insertView(item: T, index: number, count: number): void {
    const newView = viewContainerRef.createEmbeddedView(
      templateRef,
      createViewContext(item),
      index
    );
    updateViewContext(
      newView,
      {
        count,
        index,
      },
      item
    );
    newView.detectChanges();
  }
}
