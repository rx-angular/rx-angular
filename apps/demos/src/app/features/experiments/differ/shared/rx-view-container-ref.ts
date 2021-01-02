import { EMPTY, Observable, scheduled, Subject } from 'rxjs';
import {
  ChangeDetectorRef,
  EmbeddedViewRef,
  IterableChangeRecord,
  IterableChanges,
  NgIterable,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { map, mergeMap, share, switchAll, switchMap, tap } from 'rxjs/operators';
import { StrategyCredentials } from '../../../../rx-angular-pocs/cdk/render-strategies/model/strategy-credentials';
import { RxForViewContainerRefContext } from './rx-view-container-ref-context';
import { concurrent } from '../../../../rx-angular-pocs/cdk/utils/rxjs/scheduler/concurrent';
import { PriorityNameToLevel } from '../../../../rx-angular-pocs/cdk/render-strategies/model';
import { toDictionary } from '../../../../../../../../libs/state/src/lib/transformation-helpers/array';


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
  ev: () => EmbeddedViewRef<RxForViewContainerRefContext<T>>,
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
  // updateInsertedViewContext: UpdateInsertedViewContext<T>
}): RxViewContainerRef<T, RxForViewContainerRefContext<T>> {
  const {
    viewContainerRef,
    templateRef,
    createViewContext
    // updateInsertedViewContext
  } = config;

  const strat = {} as StrategyCredentials;

  const containerToUpdate$ = new Subject<ViewContainerRef>();
  const embeddedViewToUpdate$ = new Subject<EmbeddedViewRef<RxForViewContainerRefContext<T>>>();

  const changesSubject = new Subject<Observable<IterableChanges<T>>>();
  const changes$ = changesSubject.pipe(
    switchAll()
  );
  const containerUpdate$ = EMPTY;

  /*
  * divides changes into types (update, insert,...) and prepares work functions
  * additionally calculates the new 'virtualCount' => new count after work is applied,
  * needed for updating the context of all existing items in the viewContainer
  */
  const domStructureChange2$ = changes$.pipe(
    // array
    map((change) => {
      const works = {
        insert: forEachInsertToArray(change)
          .map(record => {
            return {
              ev: () => viewContainerRef.createEmbeddedView(
                templateRef,
                createViewContext(record)
              ), // no embeddedViewRef available, this view will get inserted after work is done
              index: record.currentIndex, // actually no clue
              context: {}, // context to be inserted into ev
              work: () => {
                // console.log('insert', record.currentIndex);
              }
            };
          }),
        move: forEachMoveToArray(change)
          .map(record => {
            const ev = viewContainerRef.get(record.previousIndex);
            return {
              ev: () => viewContainerRef.move(ev, record.currentIndex) as EmbeddedViewRef<RxForViewContainerRefContext<T>>, // reference
              index: record.currentIndex, // index to current position in viewContainer
              context: (ev as any).context,
              work: () => {
                // console.log('move', record.currentIndex);
              }// move view from prev to currentIndex
            };
          }),
        remove: forEachRemoveToArray(change)
          .map(record => {
            return {
              ev: () => null, // remove view from container (returns null)
              index: record.previousIndex, // index to current ev
              context: null,
              work: () => {
                viewContainerRef.remove(record.previousIndex);
              }
            };
          }),
        update: forEachUpdateToArray(change)
          .map(record => {
            const ev = viewContainerRef.get(record.currentIndex) as any;
            return {
              ev: () => ev,
              index: record.currentIndex,
              context: null,
              work: () => {
                ev.context.$implicit = record.item;
              }
            };
          })
      };

      const count = viewContainerRef.length + works.insert.length - works.remove.length;
      return {
        count,
        works
      };
    }),
    map(s => {

      const workMap = new Map<number, () => void>();
      const count = s.count;
      s.works.remove.forEach(i => workMap.set(i.index, i.work));
      // All insert
      s.works.insert.forEach(i => workMap.set(
        i.index,
          () => {
            const e = i.ev();
            e.context.setComputedContext({ index: i.index, count });
            e.detectChanges();
          }
        )
      );
      // All move
      s.works.move.forEach(i => workMap.set(i.index,
        () => {
          const e = i.ev();
          e.context.setComputedContext({ index: i.index, count });
          e.detectChanges();
        }
      ));
      // All update
      s.works.update.forEach(i => workMap.set(i.index,  () => {
        const e = i.ev();
        i.work();
        e.context.setComputedContext({ index: i.index, count });
        e.detectChanges();
      }));

      // All unchanged
      const t = [...s.works.remove, ...s.works.update, ...s.works.move]
        .reduce((acc, cur) => {
          acc.add(cur.index);
          return acc;
        }, new Set<number>());
      for (let index = 0; index < viewContainerRef.length; index++) {
        // tslint:disable-next-line:no-unused-expression
        if(t.has(index)){
          continue;
        }
        const ev = viewContainerRef.get(index) as any;
        workMap.set(index, () => {
          ev.context.setComputedContext({ index, count });
          ev.detectChanges();
        });
      }

      const works = Array.from(workMap.values());
      // Parent Flag
      if (s.works.insert.length + s.works.remove.length > 0) {
        works.push(() => config.cdRef.detectChanges());
      }
      return works;
    }),
    share()
  );

  return {
    connectChanges(newChanges: Observable<IterableChanges<T>>): void {
      changesSubject.next(newChanges);
    },
    embeddedViewChanged$: embeddedViewToUpdate$,
    subscribe
  };

  function subscribe(): void {

    domStructureChange2$.pipe(
      // inters/remove items
      // observeOnPriority(concurrent(PriorityNameToLevel.normal)),
      switchMap(works => works.length > 0 ? scheduled(works, concurrent(PriorityNameToLevel.normal))
        .pipe(
          tap(work => {
            function WORK1() {
              work();
            }

            // create EV and insert
            // const WORK1 = i.work;
            WORK1();
          })
        ) : EMPTY
      )
    )
      .subscribe();

  }

  function prepWork(i: RxViewContainerRefSpecialWork<T>, count, type) {
    // console.log('type', type);
    const w = i.work;
    const index = i.index;
    i.work = () => {
      const e = i.ev();
      e.context.setComputedContext({ index, count });
      w();
      /*// if(type === 'update' || type === 'unchanged') {
        e.detectChanges();
        // console.log('detectedChanges', e, e.context);
     // }*/
    };
    return i.work;
  }

}

function forEachToArray<T>(method: string): (changes: IterableChanges<any>) => IterableChangeRecord<any>[] {
  return (changes: IterableChanges<any>) => {
    const arr = [];
    changes[method]((record: IterableChangeRecord<any>) => arr.push(record));
    return arr;
  };
}

