import {
  EmbeddedViewRef,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  TemplateRef,
  TrackByFunction,
} from '@angular/core';
import { combineLatest, merge, Observable, of, OperatorFunction } from 'rxjs';
import {
  ignoreElements,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { RxRenderSettings, TemplateSettings } from './model';
import {
  getTNode,
  notifyAllParentsIfNeeded,
  notifyInjectingParentIfNeeded,
  TNode,
} from './utils';
import { StrategyCredentials } from '../model';
import { onStrategy } from '../utils/onStrategy';
import { strategyHandling } from '../utils/strategy-handling';
import {
  RxListViewComputedContext,
  RxListViewContext,
} from './list-view-context';
import { getTemplateHandler } from './list-view-handler';

const enum RxListTemplateChange {
  insert,
  remove,
  move,
  update,
  context,
}

export interface RxListManager<T> {
  nextStrategy: (config: string | Observable<string>) => void;

  render(changes$: Observable<NgIterable<T>>): Observable<void>;
}

export function createListTemplateManager<
  T,
  C extends RxListViewContext<T>
>(config: {
  renderSettings: RxRenderSettings<T, C>;
  templateSettings: TemplateSettings<T, C, RxListViewComputedContext> & {
    templateRef: TemplateRef<C>;
  };
  //
  trackBy: TrackByFunction<T>;
  iterableDiffers: IterableDiffers;
}): RxListManager<T> {
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
  /* TODO (regarding createView): this is currently not in use. for the list-manager this would mean to provide
   functions for not only create. developers than should have to provide create, move, remove,... the whole thing.
   i don't know if this is the right decision for a first RC */
  const listViewHandler = getTemplateHandler({
    ...templateSettings,
    patchZone,
  });
  const viewContainerRef = templateSettings.viewContainerRef;

  let notifyParent = false;
  let changesArr: [RxListTemplateChange, any][];
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
          const listChanges = listViewHandler.getListChanges(changes, items);
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

          return merge(
            combineLatest(
              // emit after all changes are rendered
              applyChanges$.length > 0 ? [...applyChanges$] : [of(items)]
            ).pipe(
              tap(() => (partiallyFinished = false)),
              // somehow this makes the strategySelect work
              notifyAllParentsIfNeeded(
                tNode,
                injectingViewCdRef,
                strategy,
                () => notifyParent
              )
            ),
            // emit injectingParent if needed
            notifyInjectingParentIfNeeded(
              injectingViewCdRef,
              strategy,
              insertedOrRemoved
            ).pipe(ignoreElements())
          );
        })
      );
  }

  function getObservablesFromChangesArray(
    changes: [RxListTemplateChange, any][],
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
                case RxListTemplateChange.insert:
                  listViewHandler.insertView(payload[0], payload[1], count);
                  break;
                case RxListTemplateChange.move:
                  listViewHandler.moveView(
                    payload[2],
                    payload[0],
                    payload[1],
                    count
                  );
                  break;
                case RxListTemplateChange.remove:
                  listViewHandler.removeView(payload);
                  break;
                case RxListTemplateChange.update:
                  listViewHandler.updateView(payload[0], payload[1], count);
                  break;
                case RxListTemplateChange.context:
                  listViewHandler.updateUnchangedContext(payload[1], count);
                  break;
              }
            },
            {}
          );
        })
      : [];
  }
}
