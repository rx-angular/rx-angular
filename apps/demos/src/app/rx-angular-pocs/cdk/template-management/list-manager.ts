import { combineLatest, from, Observable, of, ReplaySubject, Subject } from 'rxjs';
import {
  ChangeDetectorRef,
  EmbeddedViewRef,
  IterableChangeRecord,
  IterableChanges,
  NgIterable,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { groupBy, map, mergeAll, mergeMap, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { PriorityNameToLevel, StrategyCredentials, StrategyCredentialsMap } from '../render-strategies/model';
import { nameToStrategyCredentials } from '../render-strategies/utils/strategy-helper';
import { RxNotification } from '../utils/rxjs/Notification';
import { ngInputFlatten } from '../utils/rxjs/operators/ngInputFlatten';
import { reactSchedulerTick } from '../utils/scheduling/concurrent-scheduler';
import { RxListViewContext } from './model';


export interface ListManager<T, C> {
  nextStrategy: (config: string | Observable<string>) => void;
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

export function createListManager<T, C extends RxListViewContext<T>>(config: {
  cdRef: ChangeDetectorRef,
  strategies: StrategyCredentialsMap,
  defaultStrategyName: string,
  viewContainerRef: ViewContainerRef,
  templateRef: TemplateRef<C>,
  createViewContext: CreateViewContext<T, C>
}): ListManager<T, C> {
  const {
    viewContainerRef,
    templateRef,
    createViewContext,
    defaultStrategyName,
    strategies
  } = config;

  const _leWork = new Map<number, (() => EmbeddedViewRef<C>)[]>();

  const strategyName$ = new ReplaySubject<Observable<string>>(1);
  const strategy$: Observable<StrategyCredentials> = strategyName$.pipe(
    ngInputFlatten(),
    startWith(defaultStrategyName),
    nameToStrategyCredentials(strategies, defaultStrategyName),
  );

  return {
    nextStrategy(nextConfig: Observable<string>): void {
      strategyName$.next(nextConfig);
    },
    render(newChanges$: Observable<IterableChanges<T>>): Observable<any> {
      return newChanges$.pipe(
        _leRender()
      );
    }
  };

  /*
   * divides changes into types (update, insert,...) and prepares work functions
   * additionally calculates the new 'virtualCount' => new count after work is applied,
   * needed for updating the context of all existing items in the viewContainer
   */
  function _leRender() {
    return (o$: Observable<IterableChanges<T>>) => o$.pipe(
      map((change) => {
        const insertions = forEachInsertToArray(change);
        const removals = forEachRemoveToArray(change);
        const moves = forEachMoveToArray(change);
        const updates = forEachUpdateToArray(change);
        const count = viewContainerRef.length + insertions.length - removals.length;
        insertions.forEach(record => {
          _leWork.set(record.currentIndex, [() => {
            const e = viewContainerRef.createEmbeddedView(
              templateRef,
              createViewContext(record)
            );
            e.context.setComputedContext({ index: record.currentIndex, count });
            return e;
          }])
        });
        removals.forEach(record => {
          const currentView = viewContainerRef.get(record.previousIndex);
          if (currentView) {
            currentView.detach();
            _leWork.set(record.previousIndex, [() => {
              if (viewContainerRef.get(record.previousIndex)) {
                viewContainerRef.remove(record.previousIndex);
              }
              return null;
            }])
          }
        });
        moves.forEach(record => {
          viewContainerRef.get(record.previousIndex)?.detach();
          const w = () => {
            const currentView = viewContainerRef.get(record.previousIndex) as EmbeddedViewRef<C>;
            const newView = viewContainerRef.move(currentView, record.currentIndex) as EmbeddedViewRef<C>;
            newView.context.setComputedContext({ index: record.currentIndex, count });
            return newView;
          }
          if (_leWork.has(record.currentIndex)) {
            _leWork.set(record.currentIndex, [
              ..._leWork.get(record.currentIndex),
              w
            ]);
          } else {
            _leWork.set(record.currentIndex, [w]);
          }
        });
        updates.forEach(record => {
          viewContainerRef.get(record.currentIndex)?.detach();
          const w = () => {
            const currentView = viewContainerRef.get(record.currentIndex) as EmbeddedViewRef<C>;
            currentView.context.$implicit = record.item;
            currentView.context.setComputedContext({ index: record.currentIndex, count });
            return currentView;
          }
          if (_leWork.has(record.currentIndex)) {
            _leWork.set(record.currentIndex, [
              ..._leWork.get(record.currentIndex),
              w
            ]);
          } else {
            _leWork.set(record.currentIndex, [w]);
          }
        });
        // All unchanged
        for (let index = 0; index < viewContainerRef.length; index++) {
          // tslint:disable-next-line:no-unused-expression
          if (_leWork.has(index)) {
            continue;
          }
          const e = viewContainerRef.get(index) as EmbeddedViewRef<C>;
          e.detach();
          _leWork.set(index, [() => {
            e.context.setComputedContext({ index, count });
            return e;
          }]);
        }
        return insertions.length + removals.length > 0;
      }),
      withLatestFrom(strategy$),
      map(([informParent, strategy]) => {
        const works = Array.from(_leWork.entries());
        // this is to ensure that the parent notification happens
        // as the last step after all other eVs applied their changes
        if (informParent && !_leWork.has(-1)) {
          works.push([-1, [() => {
            strategy.work(
              config.cdRef,
              (config.cdRef as any)?.context || config.cdRef
            );
            return null;
          }]]);
          _leWork.set(-1, []);
        }
        return {
          works,
          strategy
        }
      }),
      switchMap(({ works, strategy}) => {
        return combineLatest([
          ...works.map(e => {
            return of(e[0]).pipe(
              strategy.behavior(
                () => {
                  let ev;
                  e[1].forEach(fn => ev = fn());
                  if (ev) {
                    ev.reattach();
                    ev.detectChanges();
                    ev.detach();
                  }
                  _leWork.delete(e[0]);
                },
                e
              ),
              // map(id => id === -1 ? 'rendered' : 'rendering')
            )
          })
        ]);
      })
    );
  }

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
      mergeMap(iArr => from(iArr).pipe(
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
