import { from, Observable } from 'rxjs';
import {
  ChangeDetectorRef,
  EmbeddedViewRef,
  IterableChangeRecord,
  IterableChanges,
  NgIterable,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { groupBy, map, mergeAll, mergeMap, switchMap } from 'rxjs/operators';
import { PriorityNameToLevel, StrategyCredentials } from '../render-strategies/model';
import { reactSchedulerTick } from '../utils/scheduling/concurrent-scheduler';
import { RxListViewContext } from './model';


export interface ListManager<T, C> {
  render(changes$: Observable<IterableChanges<T>>): Observable<any>;
}

export type RxViewContainerRefChangeType = 'update' | 'insert' | 'remove' | 'move';

export interface RxViewContainerRefSpecialWork<T, C> {
  ev: () => EmbeddedViewRef<C>,
  index: number,
  context: any,
  work: (...args: any[]) => void
  type?: RxViewContainerRefChangeType,
}

export type CreateViewContext<T, C, U extends NgIterable<T> = NgIterable<T>> =
  (record: IterableChangeRecord<T>) => C;

const forEachInsertToArray = forEachToArray('forEachAddedItem');
const forEachMoveToArray = forEachToArray('forEachMovedItem');
const forEachRemoveToArray = forEachToArray('forEachRemovedItem');
const forEachUpdateToArray = forEachToArray('forEachIdentityChange');

export function createViewContainerRef<T, C extends RxListViewContext<T>>(config: {
  cdRef: ChangeDetectorRef,
  strategy$: Observable<StrategyCredentials>,
  viewContainerRef: ViewContainerRef,
  templateRef: TemplateRef<C>,
  createViewContext: CreateViewContext<T, C>
}): ListManager<T, C> {
  const {
    viewContainerRef,
    templateRef,
    createViewContext
  } = config;

  return {
    render(newChanges$: Observable<IterableChanges<T>>): Observable<any> {
      return newChanges$.pipe(
        _render()
      );
    }
  };

  /*
 * divides changes into types (update, insert,...) and prepares work functions
 * additionally calculates the new 'virtualCount' => new count after work is applied,
 * needed for updating the context of all existing items in the viewContainer
 */
  function _render() {
    return (o$: Observable<IterableChanges<T>>) => o$.pipe(
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

                }
              };
            }),
          move: forEachMoveToArray(change)
            .map(record => {
              const ev = viewContainerRef.get(record.previousIndex);
              return {
                ev: () => viewContainerRef.move(ev, record.currentIndex) as EmbeddedViewRef<C>, // reference
                index: record.currentIndex, // index to current position in viewContainer
                context: (ev as any).context,
                work: () => {

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
        const workMap = new Map<number, [() => void, string]>();
        const count = s.count;
        s.works.remove.forEach(i => workMap.set(i.index, [i.work, 'remove']));
        // All insert
        s.works.insert.forEach(i => workMap.set(
          i.index,
          [() => {
            const e = i.ev();
            e.context.setComputedContext({ index: i.index, count });
            e.reattach();
            e.detectChanges();
            e.detach();
            return 'insert';
          }, 'insert']
          )
        );
        // All move
        s.works.move.forEach(i => workMap.set(i.index,
          [() => {
            const e = i.ev();
            e.context.setComputedContext({ index: i.index, count });
            e.reattach();
            e.detectChanges();
            e.detach();
            return 'move';
          }, 'move']
        ));
        // All update
        s.works.update.forEach(i => workMap.set(i.index, [() => {
          const e = i.ev();
          i.work();
          e.context.setComputedContext({ index: i.index, count });
          e.reattach();
          e.detectChanges();
          e.detach();
          return 'unpdate';
        }, 'update']));

        // All unchanged
        const t = [...s.works.remove, ...s.works.update, ...s.works.move]
          .reduce((acc, cur) => {
            acc.add(cur.index);
            return acc;
          }, new Set<number>());
        for (let index = 0; index < viewContainerRef.length; index++) {
          // tslint:disable-next-line:no-unused-expression
          if (t.has(index)) {
            continue;
          }
          const e = viewContainerRef.get(index) as any;
          workMap.set(index, [() => {
            e.context.setComputedContext({ index, count });
            e.reattach();
            e.detectChanges();
            e.detach();
            return 'unchanged';
          }, 'unchanged']);
        }
        // [i.index, [i.work, 'remove']] => [i.index, i.work, 'remove']
        const works = Array.from(workMap.entries()).map(e => [e[0], ...e[1]]);
        // Parent Flag
        if (s.works.insert.length + s.works.remove.length > 0) {
          works.push(['p', () => {
            config.cdRef.detectChanges();
            return 'done';
          }, 'parent']);
        }
        return works;
      }),
      switchMap(iArr => from(iArr).pipe(
        groupBy((i) => i[0] + '-' + i[2]),
        map((i$: Observable<any>) => {
          const [id, type] = (i$ as any).key.split('-');
          const INSERT_REMOVE = i => {
            return reactSchedulerTick([PriorityNameToLevel.normal, i[1]], i$);
          };
          const REST = i => {
            return reactSchedulerTick([PriorityNameToLevel.normal, i[1]], i$);
          };
          // insert/remove merge
          if (type === 'insert' || type === 'remove') {
            return i$.pipe(
              mergeMap(INSERT_REMOVE)
            );
          } else {
            // update switchMap
            return i$.pipe(
              switchMap(REST)
            );
          }
        }),
        mergeAll()
      )),
    );
  }

}


function forEachToArray<T>(method: string): (changes: IterableChanges<any>) => IterableChangeRecord<any>[] {
  return (changes: IterableChanges<any>) => {
    const arr = [];
    changes[method]((record: IterableChangeRecord<any>) => arr.push(record));
    return arr;
  };
}
