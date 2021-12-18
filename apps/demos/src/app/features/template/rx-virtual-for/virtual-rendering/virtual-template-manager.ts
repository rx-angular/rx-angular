import { ListRange } from '@angular/cdk/collections';
import {
  EmbeddedViewRef,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  TemplateRef,
  TrackByFunction,
  ViewRef,
} from '@angular/core';
import {
  RxListViewComputedContext,
  RxListViewContext,
} from '@rx-angular/cdk/template';
import { combineLatest, merge, Observable, of, OperatorFunction } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  ignoreElements,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  RxStrategyCredentials,
  onStrategy,
  strategyHandling,
} from '@rx-angular/cdk/render-strategies';
import { getTemplateHandler } from '../../../../../../../../libs/cdk/template/src/lib/list-view-handler';
import {
  RxListTemplateChange,
  RxListTemplateChangeType,
  RxRenderSettings,
  RxTemplateSettings,
} from '../../../../../../../../libs/cdk/template/src/lib/model';
import { createErrorHandler } from '../../../../../../../../libs/cdk/template/src/lib/render-error';
import {
  getTNode,
  notifyAllParentsIfNeeded,
  notifyInjectingParentIfNeeded,
  TNode,
} from '../../../../../../../../libs/cdk/template/src/lib/utils';

export interface RxListManager<T> {
  nextStrategy: (config: string | Observable<string>) => void;

  render(changes$: Observable<NgIterable<T>>): Observable<void>;
}

export type VirtualListManager<T> = Omit<RxListManager<T>, 'render'> & {
  render(
    data$: Observable<NgIterable<T>>,
    onScroll$: Observable<number>
  ): Observable<any>;
  setViewCacheSize(viewCache: number): void;
  detach(): void;
  getHeight(): number;
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
  const { templateSettings, renderSettings, trackBy, iterableDiffers } = config;
  const {
    defaultStrategyName,
    strategies,
    cdRef: injectingViewCdRef,
    parent,
    eRef,
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
  const dataDiffer: IterableDiffer<T> = iterableDiffers
    .find([])
    .create(trackBy);
  //               type,  payload
  const tNode: TNode = parent
    ? getTNode(injectingViewCdRef, eRef.nativeElement)
    : false;
  const listViewHandler = getTemplateHandler({
    ...templateSettings,
    initialTemplateRef: templateSettings.templateRef,
    patchZone: false,
  });
  const viewContainerRef = templateSettings.viewContainerRef;

  let notifyParent = false;
  let changesArr: RxListTemplateChange[];
  let partiallyFinished = false;
  let renderedRange: ListRange;
  let heights: { height: number; scrollTop: number }[] = [];
  let totalHeight = 0;
  const averager = new ItemSizeAverager();

  function heightsUntil(index: number) {
    let height = 0;
    for (let i = 0; i < index; i++) {
      height += heights[i]?.height || 0;
    }
    return height;
  }

  return {
    setViewCacheSize(viewCache: number): void {
      viewCacheSize = viewCache;
    },
    getHeight(): number {
      return totalHeight;
    },
    nextStrategy(nextConfig: Observable<string>): void {
      strategyHandling$.next(nextConfig);
    },
    render(
      values$: Observable<NgIterable<T>>,
      onScroll$: Observable<number>
    ): Observable<any> {
      return combineLatest([values$, onScroll$]).pipe(render());
    },
    detach(): void {
      for (const view of _viewCache) {
        view.destroy();
      }
      _viewCache = [];
    },
  };

  function render(): OperatorFunction<[NgIterable<T>, number], any> {
    let count = 0;
    return (o$: Observable<[NgIterable<T>, number]>): Observable<any> =>
      o$.pipe(
        // map iterable to latest diff
        map(([data, scrollTop]) => {
          const items = Array.isArray(data) ? data : [];
          let _scrollTop;
          const averageSize = averager.getAverageItemSize();
          console.log('averageSize', averageSize);
          console.log('items', items);
          dataDiffer.diff(items)?.forEachAddedItem(({ currentIndex }) => {
            _scrollTop = _scrollTop == null ? heightsUntil(currentIndex) : 0;
            heights[currentIndex] = {
              height: averageSize,
              scrollTop: _scrollTop,
            };
            _scrollTop += averageSize;
          });
          const range = { start: 0, end: items.length };
          const heightsLength = heights.length;
          let i = 0;
          const containerHeight = 350;
          const margin = 40;
          const adjustedScrollTop = scrollTop + margin;
          console.log(items.length, 'itemLenght');
          console.log(adjustedScrollTop, 'adjustedScrollTop');
          console.log(heights, 'heights');
          for (i; i < heightsLength; i++) {
            const entry = heights[i];
            if (entry.scrollTop + entry.height <= adjustedScrollTop) {
              range.start = i;
            } else if (entry.scrollTop > containerHeight + adjustedScrollTop) {
              range.end = i;
              break;
            }
          }
          const iterable = items.slice(range.start, range.end);
          renderedRange = range;
          console.log('renderedRange', range);
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
            items: iterable,
            data: items,
          };
        }),
        filter(({ changes }) => !!changes),
        withLatestFrom(strategyHandling$.strategy$),
        // Cancel old renders
        switchMap(([{ changes, items, data }, strategy]) => {
          console.log('changes', changes);
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
          count = data.length;
          // console.log('changes', changesArr, notifyParent);
          return merge(
            combineLatest(
              // emit after all changes are rendered
              applyChanges$.length > 0 ? [...applyChanges$] : [of(items)]
            ).pipe(
              tap(() => {
                partiallyFinished = false;
                let scrollTop = heightsUntil(renderedRange.start);
                let height = 0;
                for (let i = 0; i < viewContainerRef.length; i++) {
                  const _height = _setViewHeight(
                    viewContainerRef.get(i) as any,
                    i,
                    scrollTop
                  );
                  height += _height;
                  scrollTop += _height;
                }
                totalHeight = heights.reduce((a, { height }) => a + height, 0);
                console.log('addSample', renderedRange, height);
                averager.addSample(renderedRange, height);
                console.log('totalHeight', totalHeight);
                console.log('averager', averager.getAverageItemSize());
              }),
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
      ? changes.map((change) => {
          return onStrategy(
            change,
            strategy,
            (_change) => {
              const type = _change[0];
              const payload = _change[1];
              switch (type) {
                case RxListTemplateChangeType.insert:
                  // console.log('perform insert', payload);
                  _insertView(payload[0], payload[1], count);
                  break;
                case RxListTemplateChangeType.move:
                  // console.log('perform move', payload);
                  _moveView(payload[0], payload[2], payload[1], count);
                  break;
                case RxListTemplateChangeType.remove:
                  // console.log('perform remove', payload);
                  _detachAndCacheView(payload[1] as any);
                  break;
                case RxListTemplateChangeType.update:
                  // console.log('perform update', payload);
                  _updateView(payload[0], payload[1], count);
                  break;
                case RxListTemplateChangeType.context:
                  // console.log('perform context', payload);
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
      index: renderedRange.start + index,
    } as any);
    view.detectChanges();
  }

  function _updateView(item: T, index: number, count: number): void {
    const view = <EmbeddedViewRef<C>>viewContainerRef.get(index);
    templateSettings.updateViewContext(item, view, {
      count,
      index: renderedRange.start + index,
    } as any);
    view.detectChanges();
    // _setViewHeight(view, index);
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
        index: currentIndex,
      } as any);
      cachedView.detectChanges();
      // _setViewHeight(cachedView, currentIndex);
      return undefined;
    }
    const context = templateSettings.createViewContext(value, {
      count,
      index: currentIndex,
    });
    const view = viewContainerRef.createEmbeddedView(
      templateSettings.templateRef,
      context,
      currentIndex
    );
    view.detectChanges();
    // _setViewHeight(view, currentIndex);
    return view;
  }

  function _setViewHeight(
    view: EmbeddedViewRef<any>,
    currentIndex: number,
    scrollTop: number
  ): number {
    const element = view.rootNodes[0] as HTMLElement;
    const adjustedIndex = currentIndex + renderedRange.start;
    // const scrollTop = heightsUntil(adjustedIndex);
    // console.log('_setViewHeight', view.context);
    // console.log('currentIndex', currentIndex);
    console.log('scrollTop', scrollTop);
    console.log('heights', heights);
    console.log('adjustedIndex', adjustedIndex);
    const height = element.offsetHeight;
    console.log('element.offsetHeight', height);
    element.style.position = 'absolute';
    element.style.transform = `translateY(${scrollTop}px)`;
    heights[adjustedIndex] = {
      height,
      scrollTop,
    };
    return height;
  }

  /** Detaches the view at the given index and inserts into the view cache. */
  function _detachAndCacheView(index: number) {
    const detachedView = viewContainerRef.detach(index) as EmbeddedViewRef<C>;
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
      index: currentIndex,
    } as any);
    view.detectChanges();
    // _setViewHeight(view, currentIndex);
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

/**
 * A class that tracks the size of items that have been seen and uses it to estimate the average
 * item size.
 */
export class ItemSizeAverager {
  /** The total amount of weight behind the current average. */
  private _totalWeight = 0;

  /** The current average item size. */
  private _averageItemSize: number;

  /** The default size to use for items when no data is available. */
  private _defaultItemSize: number;

  /** @param defaultItemSize The default size to use for items when no data is available. */
  constructor(defaultItemSize = 50) {
    this._defaultItemSize = defaultItemSize;
    this._averageItemSize = defaultItemSize;
  }

  /** Returns the average item size. */
  getAverageItemSize(): number {
    return this._averageItemSize;
  }

  /**
   * Adds a measurement sample for the estimator to consider.
   * @param range The measured range.
   * @param size The measured size of the given range in pixels.
   */
  addSample(range: ListRange, size: number) {
    const newTotalWeight = this._totalWeight + range.end - range.start;
    if (newTotalWeight) {
      const newAverageItemSize =
        (size + this._averageItemSize * this._totalWeight) / newTotalWeight;
      if (newAverageItemSize) {
        this._averageItemSize = newAverageItemSize;
        this._totalWeight = newTotalWeight;
      }
    }
  }

  /** Resets the averager. */
  reset() {
    this._averageItemSize = this._defaultItemSize;
    this._totalWeight = 0;
  }
}
