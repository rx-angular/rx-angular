import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import {
  ChangeDetectorRef,
  EmbeddedViewRef,
  IterableChangeRecord,
  IterableChanges,
  IterableDiffer,
  NgIterable,
  TemplateRef,
  ViewContainerRef, ViewRef
} from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap, tap,
  withLatestFrom,
} from 'rxjs/operators';
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

export type RxViewContainerRefChangeType =
  | 'update'
  | 'insert'
  | 'remove'
  | 'move';

export interface RxViewContainerRefSpecialWork<T, C> {
  ev: () => EmbeddedViewRef<C>;
  index: number;
  context: any;
  work: (...args: any[]) => void;
  type?: RxViewContainerRefChangeType;
}

export type CreateViewContext<T, C> = (item: T) => C;

type K = string | number | symbol;

export interface ChangeSet<T> {
  insert?: boolean;
  update?: boolean;
  move?: boolean;
  remove?: boolean;
  record: IterableChangeRecord<T>;
  vRef?: ViewRef;
}

function addInsert<T>(
  changeSet: ChangeSet<T>,
  record: IterableChangeRecord<T>
): ChangeSet<T> {
  return { insert: true, record };
}

function addUpdate<T>(
  changeSet: ChangeSet<T>,
  record: IterableChangeRecord<T>
): ChangeSet<T> {
  return { ...(changeSet || {}), update: true, record };
}

function addMove<T>(
  changeSet: ChangeSet<T>,
  record: IterableChangeRecord<T>,
  vRef: ViewRef,
): ChangeSet<T> {
  return { move: true, record, vRef };
}

function addRemove<T>(
  changeSet: ChangeSet<T>,
  record: IterableChangeRecord<T>
): ChangeSet<T> {
  return { remove: true, record };
}

export type ChangeMap<T> = Record<K, ChangeSet<T>>;

function resetChange<T>(changeMap: ChangeMap<T>, record: IterableChangeRecord<T>): void {
  return changeMap[record.trackById] = { } as any;
}

const forEachInsertToArray = forEachToArray('forEachAddedItem');
const forEachMoveToArray = forEachToArray('forEachMovedItem');
const forEachRemoveToArray = forEachToArray('forEachRemovedItem');
const forEachUpdateToArray = forEachToArray('forEachIdentityChange');

export function createListManager<T, C extends RxListViewContext<T>>(config: {
  cdRef: ChangeDetectorRef;
  strategies: StrategyCredentialsMap;
  defaultStrategyName: string;
  viewContainerRef: ViewContainerRef;
  templateRef: TemplateRef<C>;
  createViewContext: CreateViewContext<T, C>;
  differ: IterableDiffer<T> & { collection: any };
}): ListManager<T, C> {
  const {
    viewContainerRef,
    templateRef,
    createViewContext,
    defaultStrategyName,
    strategies,
  } = config;

  const changeMap: ChangeMap<T> = {};
  const diff: any = {};

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
    render(newChanges$: Observable<NgIterable<T>>): Observable<any> {
      return newChanges$.pipe(
        map((a) => config.differ.diff(a)),
        filter((r) => r != null),
        _leRender()
      );
    },
  };

  /*
   * divides changes into types (update, insert,...) and prepares work functions
   * additionally calculates the new 'virtualCount' => new count after work is applied,
   * needed for updating the context of all existing items in the viewContainer
   */
  function _leRender() {
    return (o$: Observable<IterableChanges<T>>) =>
      o$.pipe(
        map((change) => {
          const changedItems = [];
          forEachInsertToArray(change).forEach((record) => {
            changeMap[record.trackById] = addInsert(
              changeMap[record.trackById],
              record
            );
            changedItems.push(record.trackById);
          });
          forEachRemoveToArray(change).forEach((record) => {
            changeMap[record.trackById] = addRemove(
              changeMap[record.trackById],
              record
            );
            changedItems.push(record.trackById);
          });
          forEachMoveToArray(change).forEach((record) => {
            changeMap[record.trackById] = addMove(
              changeMap[record.trackById],
              record,
              config.viewContainerRef.get(record.previousIndex)
            );
            changedItems.push(record.trackById);
          });
          forEachUpdateToArray(change).forEach((record) => {
            changeMap[record.trackById] = addUpdate(
              changeMap[record.trackById],
              record
            );
            changedItems.push(record.trackById);
          });
          return changedItems;
        }),
        withLatestFrom(strategy$),
        switchMap(([changedItems, strategy]) => {
          return combineLatest([
            ...changedItems.map((trackById) => {
              return of(trackById).pipe(
                strategy.behavior(() => {
                  const change = changeMap[trackById];

                  const record = change.record;
                  const count = config.differ.collection.length;
                  if (change.insert) {
                    insertWork(record, count);
                    resetChange(changeMap, record);
                    return;
                  }
                  if (change.remove) {
                    removeWork(record, count);
                    resetChange(changeMap, record);
                    return;
                  }
                  if (change.update) {
                    updateWork(record, count);
                    resetChange(changeMap, record);
                    return;
                  }
                  if (change.move) {
                    moveWork(record, count, change.vRef);
                    resetChange(changeMap, record);
                    return;
                  }
                }, changeMap[trackById].record.item)
              );
            }),
          ]);
        })
      );
  }

  function moveWork(record: IterableChangeRecord<T>, count: number, vRef: ViewRef) {
    const newView = viewContainerRef.move(vRef, record.currentIndex) as EmbeddedViewRef<C>;
    newView.context.setComputedContext({ index: record.currentIndex, count });
    newView.reattach();
    newView.detectChanges();
    newView.detach();
  }
  function updateWork(record: IterableChangeRecord<T>, count: number) {
    const currentView = viewContainerRef.get(
      record.currentIndex
    ) as EmbeddedViewRef<C>;
    currentView.context.$implicit = record.item;
    currentView.context.setComputedContext({
      index: record.currentIndex,
      count,
    });
    currentView.reattach();
    currentView.detectChanges();
    currentView.detach();
  }
  function removeWork(record: IterableChangeRecord<T>, count: number) {
    if (viewContainerRef.get(record.previousIndex)) {
      viewContainerRef.remove(record.previousIndex);
    }
  }
  function insertWork(record: IterableChangeRecord<T>, count: number) {
    const currentView = viewContainerRef.createEmbeddedView(
      templateRef,
      createViewContext(record.item)
    );
    currentView.context.setComputedContext({ index: record.currentIndex, count });
    currentView.detectChanges();
    currentView.detach();
  }

}

function forEachToArray<T>(
  method: string
): (changes: IterableChanges<any>) => IterableChangeRecord<any>[] {
  return (changes: IterableChanges<any>) => {
    const arr = [];
    changes[method]((record: IterableChangeRecord<any>) => arr.push(record));
    return arr;
  };
}
