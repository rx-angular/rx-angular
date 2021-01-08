import { combineLatest, merge, Observable, of, ReplaySubject, scheduled } from 'rxjs';
import {
  ChangeDetectorRef,
  EmbeddedViewRef,
  IterableChangeRecord,
  IterableChanges,
  IterableDiffer,
  NgIterable,
 TrackByFunction,
  TemplateRef,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import {
  filter,
  map,
  startWith,
  switchMap,tap,
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

export type CreateViewContext<T, C> = (item: T) => C;

type K = string | number | symbol;
export type ChangeMap<T> = Record<K, ChangeSet<T>>;

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
  let collection;
  //const notifyParent$ = new Subject<boolean>();

  return {
    nextStrategy(nextConfig: Observable<string>): void {
      strategyName$.next(nextConfig);
    },
    render(values$: Observable<NgIterable<T>>): Observable<any> {
      const d = (i: NgIterable<T>) => {
        collection = i;
        return activeDiffer || (activeDiffer = config.differ(i));
      };
      return merge(
        values$.pipe(
          _leRender2()
         /* map((a) => d(a).diff(a)),
          filter((r) => r != null),
          _leRender()*/
        )
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
  function _leRender2() {
    return (o$: Observable<NgIterable<T>>) =>
      o$.pipe(
        map(items => items ? Array.from(items) : []),
        withLatestFrom(strategy$),
        switchMap(([items, strategy]) => {
          const viewLength = viewContainerRef.length;
          let toRemoveCount = viewLength - items.length;
          const remove$ = [];
          let i = viewContainerRef.length;
          while (i > 0 && toRemoveCount > 0) {
            toRemoveCount--;
            i--;
            remove$.push(
              of(null).pipe(
                strategy.behavior(() => {
                  console.log('i', i);
                  console.log('toRemoveCount', toRemoveCount);
                  viewContainerRef.remove(i);
                }, {})
              )
            );
          }

          for (let removeI = 0; removeI < toRemoveCount; removeI++) {
            remove$.push(
              of(null).pipe(
                strategy.behavior(() => {
                  viewContainerRef.remove((removeI + viewLength) - 1);
                }, {})
              )
            )
          }
          return combineLatest([
            // support for Iterable<T> (e.g. `Map#values`)
            ...items.map((item, i) => {
              return of(item).pipe(
                strategy.behavior(() => {
                  let view = viewContainerRef.get(i) as EmbeddedViewRef<C>;
                  if (!view) {
                    view = viewContainerRef.createEmbeddedView(
                      templateRef,
                      createViewContext(item),
                      i
                    );
                  } else {
                    const entity = view.context.$implicit;
                    const trackById = config.trackBy(i, entity);
                    const currentId = config.trackBy(i, item);
                    if (trackById !== currentId || view.context.$implicit !== item) {
                      view.context.$implicit = item;
                    }
                  }
                  view.context.setComputedContext({
                    count: items.length,
                    index: i
                  });
                  view.reattach();
                  view.detectChanges();
                  view.detach();
                }, item)
              );
            }),
            ...remove$
          ]);
        })
        // tap(() => {notifyParent$.next(notifyParent);})
      );
  }
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
                  {trackById, currentIndex:  i} as any,
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

                  if(change.insert && change.remove) {
                    throw new Error('change.insert && change.remove => can never happen');
                  }
                  if (change.remove) {
                    removeWork(record, collection);
                    resetChange(changeMap, record);
                    return;
                  }

                  if (change.insert) {
                    insertWork(record, collection);
                  }


                  if (change.update) {
                    updateWork(record, collection);
                  }
                  if (change.move) {
                      moveWork(record, collection);
                   /* updateWork({
                      ...record,
                      currentIndex: record.previousIndex
                    }, collection);
                    const newRecord = collection[record.currentIndex];
                    if(newRecord) {

                      updateWork({
                        ...newRecord,
                      }, collection);
                    }*/


                  }
                  if (change.noop) {
                    unchangedWork(record, collection, change.vRef);
                  }
                  resetChange(changeMap, record);
                  return;
                }, {})
              );
            }),
          ]);
        })
        // tap(() => {notifyParent$.next(notifyParent);})
      );
  }


  function addInsert(
    changeSet: ChangeSet<T>,
    record: VirtualIterableChangeRecord<T>
  ): ChangeSet<T> {
    console.log('schedule insert', record, changeSet);
    if (changeSet?.move) {
      console.error('should not happen?');
    }

    const currentView = viewContainerRef.get(record.previousIndex) as any;
    if(currentView) {
      console.log('switch insert to move', record, changeSet);
      return {
        ...changeSet,
        insert: false,
        move: true,
        record
      }
    }
    return { insert: true, record };
  }

  function addNoop(
    changeSet: ChangeSet<T>,
    record: VirtualIterableChangeRecord<T>,
    vRef: ViewRef,
  ): ChangeSet<T> {
    if (changeSet) {
      if (changeSet.insert && !changeSet.remove) {
        console.log('overwrite insert from noop', record);
        return {
          insert: true,
          record
        }
      } else if (changeSet.insert && changeSet.remove) {
        console.error('overwrite insert from noop', record);
      }
      console.log('new insert from noop', record);
      return {
        ...changeSet,
        record,
        noop: true
      }
    }

    return { noop: true, record, vRef };
  }

  function addRemove(
    changeSet: ChangeSet<T>,
    record: VirtualIterableChangeRecord<T>
  ): ChangeSet<T> {
    console.log('schedule remove', record);
    return { ...changeSet || {}, remove: true, insert: false, record };
  }

  function resetChange(
    _changeMap: ChangeMap<T>,
    record: VirtualIterableChangeRecord<T>
  ): void {
    delete _changeMap[record.trackById];
  }

  function addMove(
    changeSet: ChangeSet<T>,
    record: VirtualIterableChangeRecord<T>,
    vRef: ViewRef,
  ): ChangeSet<T> {
    console.log('schedule move', record);
    console.log(changeSet);
    if (changeSet && changeSet.insert) {
      console.log('overwrite insert from move', record);
      const currentView = viewContainerRef.get(record.previousIndex) as any;

      if(currentView) {
        return {
          ...changeSet,
          insert: false,
          move: true,
          record,
          vRef
        }
      }
      return {
        insert: true,
        record
      }
    }

    const currentView2 = viewContainerRef.get(record.currentIndex) as any;
    if(currentView2) {
      return { update: true, record: collection[record.currentIndex] };
    }
    return { move: true, record: collection[record.currentIndex] };
  }


  function addUpdate(
    changeSet: ChangeSet<T>,
    record: VirtualIterableChangeRecord<T>
  ): ChangeSet<T> {
    console.log('schedule update', record);
    if (changeSet && changeSet.insert) {
      console.log('overwrite insert from update', record);
      const currentView = viewContainerRef.get(record.currentIndex) as any;

      if(currentView) {
        return {
          ...changeSet,
          insert: false,
          update: true,
          record
        }
      }
      return {
        insert: true,
        record
      }
    }
    return { ...(changeSet || {}), update: true, record };
  }

  function moveWork(record: IterableChangeRecord<T>, _collection: any[]) {
    console.log(viewContainerRef.get(record.previousIndex), record.previousIndex);
    const newView = viewContainerRef.move(viewContainerRef.get(record.previousIndex), record.currentIndex) as EmbeddedViewRef<C>;
    newView.context.$implicit = record.item;
    newView.context.setComputedContext({ index: record.currentIndex, count: _collection.length });
    newView.reattach();
    newView.detectChanges();
    newView.detach();
  }

  function updateWork(record: IterableChangeRecord<T>, _collection: any[]) {
    const currentView = viewContainerRef.get(
      record.currentIndex
    ) as EmbeddedViewRef<C>;
    currentView.context.$implicit = record.item;
    currentView.context.setComputedContext({
      index: record.currentIndex,
      count: _collection.length,
    });
    currentView.reattach();
    currentView.detectChanges();
    currentView.detach();
  }

  function unchangedWork(record: IterableChangeRecord<T>, _collection: any[], currentView?: any) {
    console.log('unchanged record', record);
    currentView.context.setComputedContext({
      index: record.currentIndex,
      count: _collection.length,
    });
    currentView.reattach();
    currentView.detectChanges();
    currentView.detach();
  }

  function removeWork(record: IterableChangeRecord<T>, _collection: any[]) {
    if (viewContainerRef.get(record.previousIndex)) {
      viewContainerRef.remove(record.previousIndex);
    }
  }

  function insertWork(record: IterableChangeRecord<T>, _collection: any[]) {
    const count = _collection.length;
    const currentIndex = record.currentIndex == null ? undefined : record.currentIndex;

    let currentView = viewContainerRef.get(currentIndex) as any;

    if(!currentView) {
      console.warn('insert new view')
    } else {
      console.error('insert existing view')
    }
      currentView = viewContainerRef.createEmbeddedView(
        templateRef,
        createViewContext(record.item),
        currentIndex
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
