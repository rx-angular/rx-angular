import { EMPTY, from, Observable, scheduled, Subject } from 'rxjs';
import {
  ChangeDetectorRef,
  EmbeddedViewRef,
  IterableChangeRecord,
  IterableChanges,
  NgIterable,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { concatMap, last, map, mergeMap, switchAll, switchMap, tap } from 'rxjs/operators';
import { StrategyCredentials } from '../../../../rx-angular-pocs/cdk/render-strategies/model/strategy-credentials';
import { RxForViewContainerRefContext } from './rx-view-container-ref-context';
import { observeOnPriority } from '../../../../rx-angular-pocs/cdk/utils/rxjs/operators/observeOnPriority';
import { concurrent } from '../../../../rx-angular-pocs/cdk/utils/rxjs/scheduler/concurrent';
import { PriorityNameToLevel } from '../../../../rx-angular-pocs/cdk/render-strategies/model';
import { scheduleLikeReact } from '../../../../rx-angular-pocs/cdk/utils/scheduling/concurrent-scheduler';


export interface RxForOfComputedViewContext {
  index: number;
  //count: number;
  //first: boolean;
  // last: boolean;
  odd: boolean;
  even: boolean;
}

export interface RxViewContainerRef<T, C> {
  embeddedViewChanged$: Observable<EmbeddedViewRef<C>>;

  connectChanges(changes$: Observable<IterableChanges<T>>): void;

  subscribe(): void;
}

export type RxViewContainerRefChangeType = 'update' | 'insert' | 'remove' | 'move';

export interface RxViewContainerRefSpecialWork<T> {
  ev: EmbeddedViewRef<RxForViewContainerRefContext<T>>,
  index: number,
  context: any,
  work: (...args: any[]) => void
  type?: RxViewContainerRefChangeType,
}

export type DomStructureChanges<T> =
  Record<RxViewContainerRefChangeType, RxViewContainerRefSpecialWork<T>[]>;

export type CreateViewContext<T, U extends NgIterable<T> = NgIterable<T>> =
  (record: IterableChangeRecord<T>) => RxForViewContainerRefContext<T>;
export type UpdateInsertedViewContext<T> =
  (context: RxForViewContainerRefContext<T>, count: number) => RxForViewContainerRefContext<T>;

const forEachInsertToArray = forEachToArray('forEachAddedItem');
const forEachMoveToArray = forEachToArray('forEachMovedItem');
const forEachRemoveToArray = forEachToArray('forEachRemovedItem');
const forEachUpdateToArray = forEachToArray('forEachIdentityChange');

export function createViewContainerRef<T>(config: {
  cdRef: ChangeDetectorRef,
  viewContainerRef: ViewContainerRef,
  templateRef: TemplateRef<RxForViewContainerRefContext<T>>,
  createViewContext: CreateViewContext<T>,
  updateInsertedViewContext: any
  // updateInsertedViewContext: UpdateInsertedViewContext<T>
}): RxViewContainerRef<T, RxForViewContainerRefContext<T>> {
  const {
    viewContainerRef,
    templateRef,
    createViewContext,
    updateInsertedViewContext
  } = config;

  const strat = {} as StrategyCredentials;

  const containerToUpdate$ = new Subject<ViewContainerRef>();
  const embeddedViewToUpdate$ = new Subject<EmbeddedViewRef<RxForViewContainerRefContext<T>>>();

  const changesSubject = new Subject<Observable<IterableChanges<T>>>();
  const changes$ = changesSubject.pipe(
    switchAll()
  );
  const containerUpdate$ = EMPTY;

  // Create Context of EmbeddedView + vCR
  // const inserts$ = changes$.pipe(addedItemToObservable()) as Observable<IterableChangeRecord<T>>;
  // Nothing special as we just remove + vCR
  // const removes$ = changes$.pipe(removedItemToObservable()) as Observable<IterableChangeRecord<T>>;
  // Update Context of EmbeddedView + vCR
  //  const moves$ = changes$.pipe(movedItemToObservable()) as Observable<IterableChangeRecord<T>>;

  // Update Context of EmbeddedView
  // const strategy$: Observable<any>;

  /*
  * divides changes into types (update, insert,...) and prepares work functions
  * additionally calculates the new 'virtualCount' => new count after work is applied,
  * needed for updating the context of all existing items in the viewContainer
  */
  const domStructureChange2$: Observable<{
    count: number,
    works: DomStructureChanges<T>
  }> = changes$.pipe(
    // array
    map((change) => {
      let count = 0;
      const works = {
        insert: forEachInsertToArray(change)
          .map(record => {
            ++count;

            return {
              ev: {} as any, // no embeddedViewRef available, this view will get inserted after work is done
              index: record.currentIndex, // actually no clue
              context: {}, // context to be inserted into ev
              work: () => {
                const ev = viewContainerRef.createEmbeddedView(
                  templateRef,
                  createViewContext(record)
                );
                ev.detectChanges();
                ev.detach();
              }
            };
          }),
        move: forEachMoveToArray(change)
          .map(record => {
            const ev = viewContainerRef.get(record.previousIndex);
            return {
              ev: ev as any, // reference
              index: record.previousIndex, // index to current position in viewContainer
              context: (ev as any).context,
              work: () => viewContainerRef.move(ev, record.currentIndex) // move view from prev to currentIndex
            };
          }),
        remove: forEachRemoveToArray(change)
          .map(record => {
            --count;
            const ev = viewContainerRef.get(record.previousIndex);
            return {
              ev: ev as any, // ev to be removed
              index: record.previousIndex, // index to current ev
              context: null,
              work: () => viewContainerRef.remove(record.previousIndex) // remove view from container
            };
          }),
        update: forEachUpdateToArray(change)
          .map(record => {
            return {
              ev: viewContainerRef.get(record.previousIndex) as any,
              index: record.previousIndex,
              context: null,
              work: () => viewContainerRef.remove(record.previousIndex)
            };
          })
      };
      return {
        count: works.insert.length - works.remove.length,
        works
      };
    })
  );

  /*const update = domStructureChange2$.pipe(
    // EV needs context
    mergeMap(({ count, works }) => {
      count = count + viewContainerRef.length;
      const indexesToIgnore = [
        ...works.move.map(o => o.index),
        ...works.remove.map(o => o.index)
      ];
      const allIndex = new Array(ViewContainerRef.length - 1).fill((idx) => idx);
      const unchanged = allIndex.filter(i => indexesToIgnore.includes(i)).map(index => {
        const c = viewContainerRef.get(index);
        return ({
          record: { index },
          context: (c as any).context
        });
      });

      // return updateInsertedAndMovedViewContext([...works.insert, ...works.move, ...unchanged], count);
    }),
   /!* publish((works$) => works$.pipe(
      switchMap(
        // applyStrategy(strategy$)
      )
    ))*!/
  );*/

  return {
    connectChanges(newChanges: Observable<IterableChanges<T>>): void {
      changesSubject.next(newChanges);
    },
    embeddedViewChanged$: embeddedViewToUpdate$,
    subscribe
  };

  function subscribe(): void {

    // prepare work and views and context
    domStructureChange2$.pipe(
      tap(we => console.log('domStructureChange2$', we)),
      // inters/remove items
      // observeOnPriority(concurrent(PriorityNameToLevel.normal)),
      mergeMap(s => scheduled([...s.works.insert.map(i => i), ...s.works.remove.map(i => i)], concurrent(PriorityNameToLevel.normal))
        .pipe(
          tap(i => {
            function WORK1 () {
              i.work();
            }
            // create EV and insert
           // const WORK1 = i.work;
            WORK1();
          })
        )
      ),
      tap(() => {
        console.log('PARENT');
        // Notify parent about new EV
        // cdRef is container of items which is the component that instantiates the directive
        // this is needed to trigger the ViewQueries (@NOTICE perf bottle neck)
        // View Queries emit for insert or remove only!!
        config.cdRef.detectChanges();
      })
    )
      .subscribe();
  }

  //

  function updateViewContext(context: RxForViewContainerRefContext<T>, contextUpdate: Partial<T>) {
    Object.entries(contextUpdate).forEach(([key, value]) => {
      context[key] = value;
    });
  }

  function insertEmbeddedView(context: RxForViewContainerRefContext<T>) {
    viewContainerRef.createEmbeddedView(
      templateRef,
      context
    );
  }

}

/*export function applyStrategy<T>(
  credentials$: Observable<StrategyCredentials>,
  getContext: (v?: any) => any,
  getCdRef: (k: RxNotification<T>) => ChangeDetectorRef
): (o$: Observable<{
  work: any,
  record: any,
  context: any,
}>) => Observable<RxNotification<T>> {
  return notification$ => notification$.pipe(
    publish((n$) =>
      credentials$.pipe(
        switchMap((credentials) => n$.pipe(
          switchMap(_work => {
            const activeEmbeddedView = _work.record;
            const work = () => credentials.work(activeEmbeddedView, context, work);
            return concat(of(work), NEVER).pipe(
              credentials.behavior(work, context)
            );
          })
          )
        )
      )
    )
  );
}*/

function operationsToObservable<T>() {
  return (changes) => new Observable((subscriber) => {
    changes.forEachOperation(
      (
        record: IterableChangeRecord<T>,
        previousIndex: number | null,
        currentIndex: number | null
      ) => {
        subscriber.next({ record, previousIndex, currentIndex });
      });
  });
}


function addedItemToObservable<T>() {
  return o$ => o$.pipe(
    switchMap((changes: IterableChanges<any>) => new Observable((subscriber) => {
        changes.forEachAddedItem((record) => {
          subscriber.next(record);
        });
        subscriber.complete();
      })
    )
  ) as unknown as Observable<IterableChangeRecord<T>>;
}


function identityChangeToObservable<T>() {
  return o$ => o$.pipe(
    switchMap((changes: IterableChanges<any>) => new Observable((subscriber) => {
        changes.forEachIdentityChange((record) => {
          subscriber.next(record);
        });
        subscriber.complete();
      })
    )
  ) as unknown as Observable<IterableChangeRecord<T>>;
}

function movedItemToObservable<T>() {
  return o$ => o$.pipe(
    switchMap((changes: IterableChanges<any>) => new Observable((subscriber) => {
        changes.forEachMovedItem((record) => {
          subscriber.next(record);
        });
        subscriber.complete();
      })
    )
  ) as unknown as Observable<IterableChangeRecord<T>>;
}

function removedItemToObservable<T>() {
  return o$ => o$.pipe(
    switchMap((changes: IterableChanges<any>) => new Observable((subscriber) => {
        changes.forEachRemovedItem((record) => {
          subscriber.next(record);
        });
        subscriber.complete();
      })
    )
  ) as unknown as Observable<IterableChangeRecord<T>>;
}


function forEachToObservable<T>(method: string) {
  return o$ => o$.pipe(
    switchMap((changes: IterableChanges<any>) => new Observable((subscriber) => {
        changes[method]((record) => {
          subscriber.next(record);
        });
        subscriber.complete();
      })
    )
  ) as unknown as Observable<IterableChangeRecord<T>>;
}

function forEachToArray<T>(method: string): (changes: IterableChanges<any>) => IterableChangeRecord<any>[] {
  return (changes: IterableChanges<any>) => {
    const arr = [];
    changes[method]((record: IterableChangeRecord<any>) => arr.push(record));
    return arr;
  };
}

