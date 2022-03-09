import {
  EmbeddedViewRef,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  TemplateRef,
  TrackByFunction,
} from '@angular/core';
import { combineLatest, Observable, of, OperatorFunction } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  RxStrategyCredentials,
  onStrategy,
  strategyHandling,
} from '@rx-angular/cdk/render-strategies';
import {
  RxListViewComputedContext,
  RxListViewContext,
} from './list-view-context';
import { getTemplateHandler } from './list-view-handler';
import {
  RxListTemplateChange,
  RxListTemplateChangeType,
  RxRenderSettings,
  RxTemplateSettings,
} from './model';
import { createErrorHandler } from './render-error';
import { notifyAllParentsIfNeeded } from './utils';

export interface RxListManager<T> {
  nextStrategy: (config: string | Observable<string>) => void;

  render(changes$: Observable<NgIterable<T>>): Observable<void>;
}

export function createListTemplateManager<
  T,
  C extends RxListViewContext<T>
>(config: {
  renderSettings: RxRenderSettings;
  templateSettings: Omit<
    RxTemplateSettings<T, C, RxListViewComputedContext>,
    'patchZone'
  > & {
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
  } = renderSettings;
  const errorHandler = createErrorHandler(renderSettings.errorHandler);
  const ngZone = patchZone ? patchZone : undefined;
  const strategyHandling$ = strategyHandling(defaultStrategyName, strategies);
  const differ: IterableDiffer<T> = iterableDiffers.find([]).create(trackBy);
  //               type,  context
  /* TODO (regarding createView): this is currently not in use. for the list-manager this would mean to provide
   functions for not only create. developers than should have to provide create, move, remove,... the whole thing.
   i don't know if this is the right decision for a first RC */
  const listViewHandler = getTemplateHandler({
    ...templateSettings,
    initialTemplateRef: templateSettings.templateRef,
  });
  const viewContainerRef = templateSettings.viewContainerRef;

  let notifyParent = false;
  let changesArr: RxListTemplateChange[];
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
    return (o$: Observable<NgIterable<T>>): Observable<any> =>
      combineLatest([
        o$,
        strategyHandling$.strategy$.pipe(distinctUntilChanged()),
      ]).pipe(
        // map iterable to latest diff
        map(([iterable, strategy]) => {
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
            strategy,
          };
        }),
        // Cancel old renders
        switchMap(({ changes, items, strategy }) => {
          if (!changes) {
            return of([]);
          }
          const listChanges = listViewHandler.getListChanges(changes, items);
          changesArr = listChanges[0];
          const insertedOrRemoved = listChanges[1];
          const applyChanges$ = getObservablesFromChangesArray(
            changesArr,
            strategy,
            items.length
          );
          partiallyFinished = true;
          notifyParent = insertedOrRemoved && parent;
          return new Observable((subscriber) => {
            const s = combineLatest(
              // emit after all changes are rendered
              applyChanges$.length > 0 ? applyChanges$ : [of(items)]
            )
              .pipe(
                tap(() => (partiallyFinished = false)),
                // somehow this makes the strategySelect work
                notifyAllParentsIfNeeded(
                  injectingViewCdRef,
                  strategy,
                  () => notifyParent,
                  ngZone
                ),
                map(() => items),
                catchError((e) => {
                  partiallyFinished = false;
                  errorHandler.handleError(e);
                  return of(items);
                })
              )
              .subscribe(subscriber);
            return () => {
              s.unsubscribe();
            };
          });
        })
      );
  }

  /**
   * @internal
   *
   * returns an array of streams which process all of the view updates needed to reflect the latest diff to the
   * viewContainer.
   * I
   *
   * @param changes
   * @param strategy
   * @param count
   */
  function getObservablesFromChangesArray(
    changes: RxListTemplateChange<T>[],
    strategy: RxStrategyCredentials,
    count: number
  ): Observable<RxListTemplateChangeType>[] {
    return changes.length > 0
      ? changes.map((change) => {
          const payload = change[1];
          return onStrategy(
            change[0],
            strategy,
            (type) => {
              switch (type) {
                case RxListTemplateChangeType.insert:
                  listViewHandler.insertView(payload[0], payload[1], count);
                  break;
                case RxListTemplateChangeType.move:
                  listViewHandler.moveView(
                    payload[2],
                    payload[0],
                    payload[1],
                    count
                  );
                  break;
                case RxListTemplateChangeType.remove:
                  listViewHandler.removeView(payload[1]);
                  break;
                case RxListTemplateChangeType.update:
                  listViewHandler.updateView(payload[0], payload[1], count);
                  break;
                case RxListTemplateChangeType.context:
                  listViewHandler.updateUnchangedContext(payload[1], count);
                  break;
              }
            },
            { ngZone }
          );
        })
      : [of(null)];
  }
}
