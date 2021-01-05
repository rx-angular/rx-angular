import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import {
  ChangeDetectorRef,
  EmbeddedViewRef,
  IterableChangeRecord,
  IterableChanges,
  IterableDiffer,
  NgIterable,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  filter,
  map,
  startWith,
  switchMap,
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

export type CreateViewContext<T, C> = (record: IterableChangeRecord<T>) => C;

type K = string | number | symbol;

export interface ChangeSet<T> {
  insert?: boolean;
  update?: boolean;
  move?: boolean;
  remove?: boolean;
  item: IterableChangeRecord<T>;
}

function addInsert<T>(
  changeSet: ChangeSet<T>,
  item: IterableChangeRecord<T>
): ChangeSet<T> {
  return { insert: true, item };
}

function addUpdate<T>(
  changeSet: ChangeSet<T>,
  item: IterableChangeRecord<T>
): ChangeSet<T> {
  return { ...(changeSet || {}), update: true, item };
}

function addMove<T>(
  changeSet: ChangeSet<T>,
  item: IterableChangeRecord<T>
): ChangeSet<T> {
  return { ...(changeSet || {}), move: true, item };
}

function addRemove<T>(
  changeSet: ChangeSet<T>,
  item: IterableChangeRecord<T>
): ChangeSet<T> {
  return { remove: true, item };
}

export type ChangeMap<T> = Record<K, ChangeSet<T>>;

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

  let diff: IterableChanges<T>;
  const changeMap: ChangeMap<T> = {};
  const _leWork = new Map<number, (() => EmbeddedViewRef<C>)[]>();

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
          diff = change;
          const insertions = forEachInsertToArray(change);
          const removals = forEachRemoveToArray(change);
          const moves = forEachMoveToArray(change);
          const updates = forEachUpdateToArray(change);
          const changedItems = [];
          insertions.forEach((record) => {
            changeMap[record.trackById] = addInsert(
              changeMap[record.trackById],
              record
            );
            changedItems.push(record.trackById);
          });
          removals.forEach((record) => {
            changeMap[record.trackById] = addRemove(
              changeMap[record.trackById],
              record
            );
            changedItems.push(record.trackById);
          });
          moves.forEach((record) => {
            changeMap[record.trackById] = addMove(
              changeMap[record.trackById],
              record
            );
            changedItems.push(record.trackById);
          });
          updates.forEach((record) => {
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
                  const record = changeMap[trackById].item;

                  // Insert
                  const ev = viewContainerRef.createEmbeddedView(
                    templateRef,
                    createViewContext(record)
                  );
                  ev.context.setComputedContext({
                    index: record.currentIndex,
                    count: config.differ.collection.length,
                  });
                  ev.reattach();
                  ev.detectChanges();
                  ev.detach();
                }, null)
                // map(id => id === -1 ? 'rendered' : 'rendering')
              );
            }),
          ]);
        })
      );
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
