import { combineLatest, merge, Observable, of, ReplaySubject } from 'rxjs';
import {
  ChangeDetectorRef,
  EmbeddedViewRef,
  IterableChangeRecord,
  IterableChanges,
  IterableDiffer,
  NgIterable,
  TemplateRef, TrackByFunction,
  ViewContainerRef, ViewRef
} from '@angular/core';
import {
  audit, auditTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap, tap,
  withLatestFrom
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

export type CreateViewContext<T, C> = (item: T) => C;

type K = string | number | symbol;

const enum ChangeType {
  insert,
  update,
  move,
  remove,
}

type VirtualIterableChangeRecord<T> = IterableChangeRecord<T> & {
  adjustedPreviousIndex: number | undefined;
  futureIndex: number | undefined;
}

export interface ChangeSet<T> {
  insert?: boolean;
  update?: boolean;
  move?: boolean;
  remove?: boolean;
  noop?: boolean;
  record: VirtualIterableChangeRecord<T>;
  vRef?: ViewRef;
}

function addInsert<T>(
  changeSet: ChangeSet<T>,
  record: VirtualIterableChangeRecord<T>
): ChangeSet<T> {
  console.log('schedule insert', record);
  if (changeSet?.move) {
    console.error('should not happen?');
  }
  return { insert: true, record };
}

function addUpdate<T>(
  changeSet: ChangeSet<T>,
  record: VirtualIterableChangeRecord<T>
): ChangeSet<T> {
  console.log('schedule update', record);
  return { ...(changeSet || {}), update: true, record };
}

function addMove<T>(
  changeSet: ChangeSet<T>,
  record: VirtualIterableChangeRecord<T>,
  vRef: ViewRef,
): ChangeSet<T> {
  console.log('schedule move', record);
  console.log(changeSet);
  if (changeSet && changeSet.insert) {
    console.log('overwrite insert', record);
    return {
      insert: true,
      record
    }
  }
  return { move: true, record, vRef };
}
function addNoop<T>(
  changeSet: ChangeSet<T>,
  record: VirtualIterableChangeRecord<T>,
  vRef: ViewRef,
): ChangeSet<T> {
  if (changeSet) {
    return {
      ...changeSet,
      record,
      noop: true
    }
  }
  return { noop: true, record, vRef };
}

function addRemove<T>(
  changeSet: ChangeSet<T>,
  record: VirtualIterableChangeRecord<T>
): ChangeSet<T> {
  console.log('schedule remove', record);
  return { remove: true, record };
}

export type ChangeMap<T> = Record<K, ChangeSet<T>>;

function resetChange<T>(
  changeMap: ChangeMap<T>,
  record: VirtualIterableChangeRecord<T>
): void {
  delete changeMap[record.trackById];
}

export function createListManager<T, C extends RxListViewContext<T>>(config: {
  cdRef: ChangeDetectorRef;
  strategies: StrategyCredentialsMap;
  defaultStrategyName: string;
  viewContainerRef: ViewContainerRef;
  templateRef: TemplateRef<C>;
  createViewContext: CreateViewContext<T, C>;
  trackBy: TrackByFunction<T>,
  differ: (items: NgIterable<T>) => IterableDiffer<T> & { collection: any };
}): ListManager<T, C> {
  const {
    viewContainerRef,
    templateRef,
    createViewContext,
    defaultStrategyName,
    strategies,
  } = config;

  const changeMap: ChangeMap<T> = {};

  const strategyName$ = new ReplaySubject<Observable<string>>(1);
  const strategy$: Observable<StrategyCredentials> = strategyName$.pipe(
    ngInputFlatten(),
    startWith(defaultStrategyName),
    nameToStrategyCredentials(strategies, defaultStrategyName)
  );

  let activeDiffer: IterableDiffer<T> & { collection: any };
  //const notifyParent$ = new Subject<boolean>();

  return {
    nextStrategy(nextConfig: Observable<string>): void {
      strategyName$.next(nextConfig);
    },
    render(newChanges$: Observable<NgIterable<T>>): Observable<any> {
      const d = (i: NgIterable<T>) => {
        return activeDiffer || (activeDiffer = config.differ(i));
      };
      return merge(
        newChanges$.pipe(
          map((a) => d(a).diff(a)),
          filter((r) => r != null),
          _leRender()
        ),
        /* notifyParent$.pipe(
          withLatestFrom(strategy$),
          switchMap(([_, strategy]) =>
            notifyParent
              ? strategy.behavior(() => {
                  strategy.work(
                    config.cdRef,
                    (config.cdRef as any).context || config.cdRef
                  );
                  notifyParent = false;
                console.log('parent notified', (config.cdRef as any).context);
                }, (config.cdRef as any).context || config.cdRef)(of(null))
              : of(null)
          ),
          filter(v => v !== null)*/
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
          const changedItemsSet = new Set<any>();
          change.forEachOperation((record: VirtualIterableChangeRecord<T>, adjustedPreviousIndex: number|null, currentIndex: number|null) => {
            // Insert
            if (record.previousIndex == null) {
              record.adjustedPreviousIndex = adjustedPreviousIndex === null ? undefined : adjustedPreviousIndex;
              changeMap[record.trackById] = addInsert(
                changeMap[record.trackById],
                record
              );
              changedItems.push(record.trackById);
              changedItemsSet.add(record.trackById);
              }
            // Remove
            else if (currentIndex == null) {
              record.adjustedPreviousIndex = adjustedPreviousIndex === null ? undefined : adjustedPreviousIndex;
              changeMap[record.trackById] = addRemove(
                changeMap[record.trackById],
                record
              );
              changedItems.push(record.trackById);
              changedItemsSet.add(record.trackById);
            }
            // Move
            else if (adjustedPreviousIndex !== null) {
              record.adjustedPreviousIndex = adjustedPreviousIndex;
              changeMap[record.trackById] = addMove(
                changeMap[record.trackById],
                record,
                config.viewContainerRef.get(record.previousIndex)
              );
              changedItems.push(record.trackById);
              changedItemsSet.add(record.trackById);
            }
            });
          const updateNoops = !!changedItemsSet.size;
          // Update
          change.forEachIdentityChange((record: any) => {
            changeMap[record.trackById] = addUpdate(
              changeMap[record.trackById],
              record
            );
            changedItems.push(record.trackById);
            changedItemsSet.add(record.trackById);
          });

          if (updateNoops) {
            // Unchanged
            for (let i = 0, ilen = viewContainerRef.length; i < ilen; i++) {
              const vRef = <EmbeddedViewRef<C>>viewContainerRef.get(i);
              const trackById = config.trackBy(i, vRef.context.$implicit);
              if (!changedItemsSet.has(trackById)) {
                changeMap[trackById] = addNoop(
                  {vRef} as any,
                  {trackById} as any,
                  vRef
                );
                changedItems.push(trackById);
              }
            }
          }
          // ---------------------------------

          console.log('changedItems', changedItems);
          return Object.keys(changeMap).sort((idA, idB) => {
            return changeMap[idA].record.currentIndex - changeMap[idB].record.currentIndex;
          });
        }),
        tap(console.log),
        withLatestFrom(strategy$),
        switchMap(([changedItems, strategy]) => {
          return combineLatest([
            ...changedItems.map((trackById) => {
              return of(trackById).pipe(
                strategy.behavior(() => {
                  const change = changeMap[trackById];
                  console.log('do Change', change);
                  const record = change.record;
                  const count = activeDiffer.collection.length;
                  if (change.insert) {
                    insertWork(record, count);
                    resetChange(changeMap, record);
                  }
                  if (change.remove) {
                    removeWork(record, count);
                    resetChange(changeMap, record);
                  }
                  if (change.update) {
                    updateWork(record, count);
                    resetChange(changeMap, record);
                  }
                  if (change.move) {
                    moveWork(record, count, change.vRef);
                    resetChange(changeMap, record);
                  }
                  if (change.noop) {
                    unchangedWork(record, count);
                    resetChange(changeMap, record);
                  }
                  return;
                }, {})
              );
            }),
          ]);
        }),
        // tap(() => {notifyParent$.next(notifyParent);})
      );
  }

  function moveWork(record: IterableChangeRecord<T>, count: number, vRef: ViewRef) {
    const newView = viewContainerRef.move(vRef, record.currentIndex) as EmbeddedViewRef<C>;
    newView.context.$implicit = record.item;
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
  function unchangedWork(record: IterableChangeRecord<T>, count?: number) {
    const currentView = viewContainerRef.get(
      record.currentIndex
    ) as EmbeddedViewRef<C>;
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
      createViewContext(record.item),
      record.currentIndex === null ? undefined : record.currentIndex
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
