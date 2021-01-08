import {
  ChangeDetectorRef,
  EmbeddedViewRef,
  IterableChangeRecord,
  IterableChanges,
  IterableDiffer,
  NgIterable,
  TemplateRef,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import {
  combineLatest,
  merge,
  Observable,
  of,
  ReplaySubject,
  Subject,
} from 'rxjs';
import {
  filter,
  map, shareReplay,
  startWith,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { StrategyCredentials, StrategyCredentialsMap } from '../render-strategies/model/strategy-credentials';
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

export interface ChangeSet<T> {
  type: ChangeType;
  record: IterableChangeRecord<T>;
  vRef?: ViewRef;
}

function addInsert<T>(
  changeSet: ChangeSet<T>,
  record: IterableChangeRecord<T>
): ChangeSet<T> {
  return { type: ChangeType.insert, record };
}

function addUpdate<T>(
  changeSet: ChangeSet<T>,
  record: IterableChangeRecord<T>
): ChangeSet<T> {
  return { type: ChangeType.update, record };
}

function addMove<T>(
  changeSet: ChangeSet<T>,
  record: IterableChangeRecord<T>,
  vRef: ViewRef
): ChangeSet<T> {
  return { type: ChangeType.move, record, vRef };
}

function addRemove<T>(
  changeSet: ChangeSet<T>,
  record: IterableChangeRecord<T>
): ChangeSet<T> {
  return { type: ChangeType.remove, record };
}

export type ChangeMap<T> = Record<K, ChangeSet<T>>;

function resetChange<T>(
  changeMap: ChangeMap<T>,
  record: IterableChangeRecord<T>
): void {
  return (changeMap[record.trackById] = {} as any);
}

function createWorkMap<T, C extends RxListViewContext<T>>(
  viewContainerRef: ViewContainerRef,
  insertTemplate: TemplateRef<C>,
  createViewContext: CreateViewContext<T, C>
): Record<
  ChangeType,
  (record: IterableChangeRecord<T>, count: number, vRef?: ViewRef) => void
> {
  return {
    [ChangeType.insert]: insertWork,
    [ChangeType.move]: moveWork,
    [ChangeType.update]: updateWork,
    [ChangeType.remove]: removeWork,
  };

  function moveWork(
    record: IterableChangeRecord<T>,
    count: number,
    vRef: ViewRef
  ) {
    if (vRef) {
      const newView = viewContainerRef.move(
        vRef,
        record.currentIndex
      ) as EmbeddedViewRef<C>;
      newView.context.setComputedContext({
        index: record.currentIndex,
        count,
      });
      newView.reattach();
      newView.detectChanges();
      newView.detach();
    }
  }
  function updateWork(record: IterableChangeRecord<T>, count: number) {
    const currentView = viewContainerRef.get(
      record.currentIndex
    ) as EmbeddedViewRef<C>;
    // insertWork(record, count);
    if (currentView) {
      currentView.context.$implicit = record.item;
      currentView.context.setComputedContext({
        index: record.currentIndex,
        count,
      });
      currentView.reattach();
      currentView.detectChanges();
      currentView.detach();
    }
  }
  function removeWork(record: IterableChangeRecord<T>, count: number) {
    if (viewContainerRef.get(record.previousIndex)) {
      viewContainerRef.remove(record.previousIndex);
    }
  }
  function insertWork(record: IterableChangeRecord<T>, count: number) {
    const currentView = viewContainerRef.createEmbeddedView(
      insertTemplate,
      createViewContext(record.item)
    );
    currentView.context.setComputedContext({
      index: record.currentIndex,
      count,
    });
    currentView.detectChanges();
    currentView.detach();
  }
}

export function createListManager<T, C extends RxListViewContext<T>>(config: {
  cdRef: ChangeDetectorRef;
  strategies: StrategyCredentialsMap;
  defaultStrategyName: string;
  viewContainerRef: ViewContainerRef;
  templateRef: TemplateRef<C>;
  createViewContext: CreateViewContext<T, C>;
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
  const workMap = createWorkMap(
    viewContainerRef,
    templateRef,
    createViewContext
  );

  const strategyName$ = new ReplaySubject<Observable<string>>(1);
  const strategy$: Observable<StrategyCredentials> = strategyName$.pipe(
    ngInputFlatten(),
    startWith(defaultStrategyName),
    nameToStrategyCredentials(strategies, defaultStrategyName),
    shareReplay({ bufferSize: 1, refCount: true})
  );

  let notifyParent = false;
  const doNotifyMap = {
    [ChangeType.insert]: true,
    [ChangeType.remove]: true,
    [ChangeType.move]: false,
    [ChangeType.update]: false,
  };
  let activeDiffer: IterableDiffer<T> & { collection: any };
  const notifyParent$ = new Subject<boolean>();

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
        notifyParent$.pipe(
          withLatestFrom(strategy$),
          switchMap(([_, strategy]) =>
            notifyParent
              ? strategy.behavior(() => {
                  strategy.work(
                    config.cdRef,
                    (config.cdRef as any).context || config.cdRef
                  );
                  notifyParent = false;
                }, (config.cdRef as any).context || config.cdRef)(of(null))
              : of(null)
          )
        )
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
          const changedItems = new Set<any>();
          change.forEachAddedItem((record) => {
            changeMap[record.trackById] = addInsert(
              changeMap[record.trackById],
              record
            );
            changedItems.add(record.trackById);
          });
          change.forEachRemovedItem((record) => {
            changeMap[record.trackById] = addRemove(
              changeMap[record.trackById],
              record
            );
            changedItems.add(record.trackById);
          });
          change.forEachMovedItem((record) => {
            changeMap[record.trackById] = addMove(
              changeMap[record.trackById],
              record,
              config.viewContainerRef.get(record.previousIndex)
            );
            changedItems.add(record.trackById);
          });
          change.forEachIdentityChange((record) => {
            changeMap[record.trackById] = addUpdate(
              changeMap[record.trackById],
              record
            );
            changedItems.add(record.trackById);
          });
          return Array.from(changedItems.values());
        }),
        withLatestFrom(strategy$),
        switchMap(([changedItems, strategy]) => {
          return combineLatest([
            ...changedItems.map((trackById) => {
              return of(trackById).pipe(
                strategy.behavior(() => {
                  const change = changeMap[trackById];
                  const record = change.record;
                  const count = activeDiffer.collection.length;
                  notifyParent = notifyParent || doNotifyMap[change.type];
                  workMap[change.type](record, count, change.vRef);
                  resetChange(changeMap, record);
                }, {})
              );
            }),
          ]);
        }),
        tap(() => {
          notifyParent$.next(notifyParent);
        })
      );
  }
}
