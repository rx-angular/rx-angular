import {
  EmbeddedViewRef,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  TemplateRef,
  TrackByFunction,
} from '@angular/core';
import { combineLatest, merge, Observable, of, OperatorFunction } from 'rxjs';
import { ignoreElements, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { StrategyCredentials } from '../render-strategies/model';

import { onStrategy } from '../render-strategies/utils/strategy-helper';
import {
  ListChange, ListManager,
  RenderSettings,
  RxListViewContext,
  TemplateSettings,
} from './model';
import {
  getListChanges,
  getListTemplateManager,
  getTNode,
  notifyAllParentsIfNeeded,
  notifyInjectingParentIfNeeded,
  strategyHandling,
  TNode,
} from './utils';
import { RxViewContext } from '@rx-angular/cdk';
import { getTableUnknownColumnError } from '@angular/cdk/table/table-errors';

type r<T> = Record<string | number | symbol, T>

export function createListManager<
  T,
  C extends RxListViewContext<r<T>> & RxViewContext<T>
>(config: {
  renderSettings: RenderSettings<T, C>;
  templateSettings: TemplateSettings<T, C> & { templateRef: TemplateRef<C> };
  //
  trackBy: TrackByFunction<T>;
  iterableDiffers: IterableDiffers;
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
          const listChanges = getListChanges(changes, items);
          changesArr = listChanges[0];
          const insertedOrRemoved = listChanges[1];
          const applyChanges$ = getObservablesFromChangesArray(
            changesArr,
            strategy,
            count
          );
          partiallyFinished = true;
          // @TODO we need to know if we need to notifyParent on move aswell
          notifyParent = insertedOrRemoved && parent;
          count = items.length;


          const observableChanges: Observable<unknown>[] =  applyChanges$.length > 0 ? [...applyChanges$] : [of(items)];
          return merge(
            combineLatest(
              // emit after all changes are rendered
              observableChanges
            ).pipe(
              // emit injectingParent if needed
              tap(() => partiallyFinished = false),
              // somehow this makes the strategySelect work
              notifyAllParentsIfNeeded(
                tNode,
                injectingViewCdRef,
                strategy,
                () => notifyParent
              )
            ),
            notifyInjectingParentIfNeeded(
              injectingViewCdRef,
              strategy,
              insertedOrRemoved
            ).pipe(ignoreElements()),
          );
        })
      );
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
