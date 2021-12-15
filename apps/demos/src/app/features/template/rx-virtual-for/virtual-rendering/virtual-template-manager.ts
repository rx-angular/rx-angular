import { ListRange } from '@angular/cdk/collections';
import {
  EmbeddedViewRef,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  TemplateRef,
  TrackByFunction,
} from '@angular/core';
import { RxListViewComputedContext, RxListViewContext } from '@rx-angular/cdk/template';
import { combineLatest, merge, Observable, of, OperatorFunction } from 'rxjs';
import {
  catchError, distinctUntilChanged,
  ignoreElements,
  map,
  switchMap,
  tap, withLatestFrom
} from 'rxjs/operators';
import { RxStrategyCredentials, onStrategy, strategyHandling } from '@rx-angular/cdk/render-strategies';
import { getTemplateHandler } from '../../../../../../../../libs/cdk/template/src/lib/list-view-handler';
import {
  RxListTemplateChange, RxListTemplateChangeType,
  RxRenderSettings,
  RxTemplateSettings
} from '../../../../../../../../libs/cdk/template/src/lib/model';
import { createErrorHandler } from '../../../../../../../../libs/cdk/template/src/lib/render-error';
import {
  getTNode,
  notifyAllParentsIfNeeded,
  notifyInjectingParentIfNeeded,
  TNode
} from '../../../../../../../../libs/cdk/template/src/lib/utils';

export interface RxListManager<T> {
  nextStrategy: (config: string | Observable<string>) => void;

  render(changes$: Observable<NgIterable<T>>): Observable<void>;
}

export type VirtualListManager<T> = Omit<RxListManager<T>, 'render'> & {
  render(
    data$: Observable<NgIterable<T>>,
    range: Observable<ListRange>
  ): Observable<any>;
  setViewCacheSize(viewCache: number): void;
  detach(): void;
};

export function createVirtualListManager<
  T,
  C extends RxListViewContext<T>
  >(config: {
  renderSettings: RxRenderSettings<T, C>;
  templateSettings: RxTemplateSettings<T, C> & {
    templateRef: TemplateRef<C>;
  };
  //
  trackBy: TrackByFunction<T>;
  iterableDiffers: IterableDiffers;
}): VirtualListManager<T> {
  const { templateSettings, renderSettings, trackBy, iterableDiffers } =
    config;
  const {
    defaultStrategyName,
    strategies,
    cdRef: injectingViewCdRef,
    parent,
    eRef
  } = renderSettings;

  /**
   * The size of the cache used to store unused views.
   * Setting the cache size to `0` will disable caching. Defaults to 20 views.
   */
  let viewCacheSize = 55;

  /**
   * View cache that stores embedded view instances that have been previously stamped out,
   * but don't are not currently rendered. The view repeater will reuse these views rather than
   * creating brand new ones.
   *
   * TODO(michaeljamesparsons) Investigate whether using a linked list would improve performance.
   */
  let _viewCache: EmbeddedViewRef<C>[] = [];

  const strategyHandling$ = strategyHandling(defaultStrategyName, strategies);
  const differ: IterableDiffer<T> = iterableDiffers.find([]).create(trackBy);
  //               type,  payload
  const tNode: TNode = parent
                       ? getTNode(injectingViewCdRef, eRef.nativeElement)
                       : false;
  const listViewHandler = getTemplateHandler({
    ...templateSettings,
    initialTemplateRef: templateSettings.templateRef,
    patchZone: false
  });
  const viewContainerRef = templateSettings.viewContainerRef;

  let notifyParent = false;
  let changesArr: RxListTemplateChange[];
  let partiallyFinished = false;
  let renderedRange: ListRange;

  return {
    setViewCacheSize(viewCache: number): void {
      viewCacheSize = viewCache;
    },
    nextStrategy(nextConfig: Observable<string>): void {
      strategyHandling$.next(nextConfig);
    },
    render(
      values$: Observable<NgIterable<T>>,
      range: Observable<ListRange>
    ): Observable<any> {
      return combineLatest([values$, range]).pipe(render());
    },
    detach(): void {
      for (const view of _viewCache) {
        view.destroy();
      }
      _viewCache = [];
    }
  };

  function render(): OperatorFunction<[NgIterable<T>, ListRange], any> {
    let count = 0;
    return (o$: Observable<[NgIterable<T>, ListRange]>): Observable<any> =>
      o$.pipe(
        // map iterable to latest diff
        map(([data, range]) => {
          const items = Array.isArray(data) ? data : [];
          const iterable = items.slice(range.start, range.end);
          renderedRange = range;
          if (partiallyFinished) {
            const currentIterable = [];
            for (
              let i = 0, ilen = viewContainerRef.length;
              i < ilen;
              i++
            ) {
              const viewRef = <EmbeddedViewRef<C>>(
                viewContainerRef.get(i)
              );
              currentIterable[i] = viewRef.context.$implicit;
            }
            differ.diff(currentIterable);
          }
          return {
            changes: differ.diff(iterable),
            items: iterable,
            data: items
          };
        }),
        withLatestFrom(strategyHandling$.strategy$),
        // Cancel old renders
        switchMap(([{ changes, items, data }, strategy]) => {
          const listChanges = listViewHandler.getListChanges(
            changes,
            items
          );
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
          count = data.length;
          // console.log('changes', changesArr, notifyParent);
          return merge(
            combineLatest(
              // emit after all changes are rendered
              applyChanges$.length > 0
              ? [...applyChanges$]
              : [of(items)]
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
    changes: RxListTemplateChange[],
    strategy: RxStrategyCredentials,
    count: number
  ) {
    return changes.length > 0
           ? changes.map(change => {
        return onStrategy(
          change,
          strategy,
          _change => {
            const type = _change[0];
            const payload = _change[1];
            switch (type) {
              case RxListTemplateChangeType.insert:
                _insertView(payload[0], payload[1], count);
                break;
              case RxListTemplateChangeType.move:
                _moveView(
                  payload[0],
                  payload[2],
                  payload[1],
                  count
                );
                break;
              case RxListTemplateChangeType.remove:
                _detachAndCacheView(payload as any);
                break;
              case RxListTemplateChangeType.update:
                _updateView(payload[0], payload[1], count);
                break;
              case RxListTemplateChangeType.context:
                _updateUnchangedContext(payload[1], count);
                break;
            }
          },
          {}
        );
      })
           : [];
  }

  function _updateUnchangedContext(index: number, count: number) {
    const view = <EmbeddedViewRef<C>>viewContainerRef.get(index);
    view.context.updateContext({
      count,
      index: renderedRange.start + index
    } as any);
    view.detectChanges();
  }

  function _updateView(item: T, index: number, count: number): void {
    const view = <EmbeddedViewRef<C>>viewContainerRef.get(index);
    templateSettings.updateViewContext(item, view, {
      count,
      index: renderedRange.start + index
    } as any);
    view.detectChanges();
  }

  /**
   * Inserts a view for a new item, either from the cache or by creating a new
   * one. Returns `undefined` if the item was inserted into a cached view.
   */
  function _insertView(
    value: T,
    currentIndex: number,
    count: number
  ): EmbeddedViewRef<C> | undefined {
    const cachedView = _insertViewFromCache(currentIndex);
    if (cachedView) {
      templateSettings.updateViewContext(value, cachedView, {
        count,
        index: currentIndex
      } as any);
      cachedView.detectChanges();
      return undefined;
    }
    const context = templateSettings.createViewContext(value, {
      count,
      index: currentIndex
    });
    const view = viewContainerRef.createEmbeddedView(
      templateSettings.templateRef,
      context,
      currentIndex
    );
    view.detectChanges();
    return view;
  }

  /** Detaches the view at the given index and inserts into the view cache. */
  function _detachAndCacheView(index: number) {
    const detachedView = viewContainerRef.detach(
      index
    ) as EmbeddedViewRef<C>;
    detachedView.detectChanges();
    _maybeCacheView(detachedView);
  }

  /** Moves view at the previous index to the current index. */
  function _moveView(
    value: T,
    adjustedPreviousIndex: number,
    currentIndex: number,
    count: number
  ): EmbeddedViewRef<C> {
    const view = viewContainerRef.get(
      adjustedPreviousIndex
    ) as EmbeddedViewRef<C>;
    viewContainerRef.move(view, currentIndex);
    templateSettings.updateViewContext(value, view, {
      count,
      index: currentIndex
    } as any);
    view.detectChanges();
    return view;
  }

  /**
   * Cache the given detached view. If the cache is full, the view will be
   * destroyed.
   */
  function _maybeCacheView(view: EmbeddedViewRef<C>) {
    if (_viewCache.length < viewCacheSize) {
      _viewCache.push(view);
    } else {
      const index = viewContainerRef.indexOf(view);

      // The host component could remove views from the container outside of
      // the view repeater. It's unlikely this will occur, but just in case,
      // destroy the view on its own, otherwise destroy it through the
      // container to ensure that all the references are removed.
      if (index === -1) {
        view.destroy();
        // view.detectChanges();
      } else {
        viewContainerRef.remove(index);
      }
    }
  }

  /** Inserts a recycled view from the cache at the given index. */
  function _insertViewFromCache(index: number): EmbeddedViewRef<C> | null {
    const cachedView = _viewCache.pop();
    if (cachedView) {
      viewContainerRef.insert(cachedView, index);
    }
    return cachedView || null;
  }
}
