import {
  EmbeddedViewRef,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  TemplateRef,
  TrackByFunction,
} from '@angular/core';
import { combineLatest, Observable, OperatorFunction } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { StrategyCredentials } from '../render-strategies/model';
import { onStrategy } from '../render-strategies/utils';

import {
  DistinctByFunction,
  ListChange,
  NgViewContext,
  RenderSettings,
  RxListViewContext,
  TemplateSettings
} from './model';
import {
  getChangesArray,
  getListTemplateManager,
  getTNode,
  notifyAllParentsIfNeeded,
  notifyInjectingParentIfNeeded,
  strategyHandling,
  TNode,
} from './utils';

export interface ListManager<T, C> {
  nextStrategy: (config: string | Observable<string>) => void;

  render(changes$: Observable<NgIterable<T>>): Observable<C>;
}


export function createListManager<
  T,
  C extends RxListViewContext<T> & NgViewContext<T>
>(config: {
  renderSettings: RenderSettings<T, C>;
  templateSettings: TemplateSettings<T, C> & { templateRef: TemplateRef<C> };
  //
  trackBy: TrackByFunction<T>;
  iterableDiffers: IterableDiffers;
  distinctBy?: DistinctByFunction<T>;
}): ListManager<T, C> {
  const { templateSettings, renderSettings, trackBy, iterableDiffers } = config;
  const {
    defaultStrategyName,
    strategies,
    cdRef: injectingViewCdRef,
    patchZone,
    parent,
    eRef,
  } = renderSettings;
  const strategyHandling$ = strategyHandling(defaultStrategyName, strategies);
  const differ: IterableDiffer<T> = iterableDiffers.find([]).create(trackBy);
  //               type,  payload
  const tNode: TNode = parent
    ? getTNode(injectingViewCdRef, eRef.nativeElement)
    : false;
  const listTemplateManager = getListTemplateManager({
    ...templateSettings,
    patchZone,
  });
  const viewContainerRef = templateSettings.viewContainerRef;

  let notifyParent = false;
  let changesArr: [ListChange, any][];
  let partiallyFinished = false;

  return {
    nextStrategy(nextConfig: Observable<string>): void {
      strategyHandling$.next(nextConfig);
    },
    render(values$: Observable<NgIterable<T>>): Observable<any> {
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
        withLatestFrom(strategyHandling$.strategy$),
        // Cancel old renders
        switchMap(([{ changes, items }, strategy]) => {
          if (!changes) {
            return [];
          }
          changesArr = getChangesArray(changes, items);
          const insertedOrRemoved = getInsertOrRemoveState(items, count);
          const applyChanges$ = getObservablesFromChangesArray(
            changesArr,
            strategy,
            count
          );
          partiallyFinished = true;
          notifyParent = insertedOrRemoved && parent;
          count = items.length;

          return combineLatest([
            // emit after all changes are rendered
            ...applyChanges$,
            // emit injectingParent if needed
            notifyInjectingParentIfNeeded(
              injectingViewCdRef,
              strategy,
              insertedOrRemoved
            ),
          ]).pipe(
            tap(() => (partiallyFinished = false)),
            // somehow this makes the material select work
            notifyAllParentsIfNeeded(
              tNode,
              injectingViewCdRef,
              strategy,
              () => notifyParent
            ),
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
                  listTemplateManager.insertView(payload[0], payload[1], count);
                  break;
                case ListChange.move:
                  listTemplateManager.moveView(
                    payload[2],
                    payload[0],
                    payload[1],
                    count
                  );
                  break;
                case ListChange.remove:
                  listTemplateManager.removeView(payload);
                  break;
                case ListChange.update:
                  listTemplateManager.updateView(payload[0], payload[1], count);
                  break;
                case ListChange.context:
                  listTemplateManager.updateUnchangedContext(payload[1], count);
                  break;
              }
            },
            {}
          );
        })
      : [];
  }
}
