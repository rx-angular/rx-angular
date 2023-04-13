import { EmbeddedViewRef, IterableChanges, NgZone } from '@angular/core';
import {
  onStrategy,
  RxStrategyCredentials,
} from '@rx-angular/cdk/render-strategies';
import { RxListViewContext } from '@rx-angular/cdk/template';
import { Observable, Subject } from 'rxjs';

import {
  ListRange,
  ListTemplateChange,
  ListTemplateChanges,
  ListTemplateChangeType,
  TemplateSettings,
} from './model';

/**
 * @internal
 *
 * An object that holds methods needed to introduce actions to a list e.g. move, remove, insert
 */
export interface RxVirtualListTemplateManager<T, C> {
  toTemplateWork(
    iterableChanges: IterableChanges<T>,
    items: T[],
    renderedRange: ListRange,
    strategy: RxStrategyCredentials,
    count: number,
    ngZone?: NgZone
  ): {
    insertedOrRemoved: boolean;
    changes: ListTemplateChange<T>[];
    work$: Observable<ListTemplateChange<T>>[];
  };
  viewRendered$: Observable<{
    view: EmbeddedViewRef<C>;
    index?: number;
    item: T;
    change: ListTemplateChangeType;
  }>;
  detach(): void;
}

/**
 * @internal
 *
 * Factory that returns a `ListTemplateManager` for the passed params.
 *
 * @param templateSettings
 */
export function getVirtualTemplateHandler<C extends RxListViewContext<T>, T>({
  viewContainerRef,
  templateRef,
  createViewContext,
  updateViewContext,
  viewCacheSize,
}: TemplateSettings<T, C, any>): RxVirtualListTemplateManager<T, C> {
  let _viewCache: EmbeddedViewRef<C>[] = [];
  const _viewRendered$ = new Subject<{
    index?: number;
    view: EmbeddedViewRef<C>;
    item: T;
    change: ListTemplateChangeType;
  }>();

  return {
    toTemplateWork,
    viewRendered$: _viewRendered$,
    detach: () => {
      for (const view of _viewCache) {
        view.destroy();
      }
      _viewCache = [];
    },
  };

  function toTemplateWork(
    iterableChanges: IterableChanges<T>,
    items: T[],
    renderedRange: ListRange,
    strategy: RxStrategyCredentials,
    count: number,
    ngZone?: NgZone
  ) {
    const listChanges = getListChanges(iterableChanges, items);
    const changes = listChanges[0].sort(([, payloadA], [, payloadB]) => {
      return (payloadA[1] || 0) - (payloadB[1] || 0);
    });
    const insertedOrRemoved = listChanges[1];
    return {
      insertedOrRemoved,
      changes,
      work$:
        changes.length > 0
          ? changes.map((change) => {
              return onStrategy(
                change,
                strategy,
                (_change) => {
                  const [type, [item, index, adjustedPreviousIndex]] = _change;
                  const update = () => ({
                    view: viewContainerRef.get(
                      index || 0
                    ) as EmbeddedViewRef<C>,
                    index,
                    change: type,
                    item,
                  });
                  switch (type) {
                    case ListTemplateChangeType.insert:
                      _insertView(
                        item,
                        index!,
                        count,
                        renderedRange.start + index!
                      );
                      // console.log('perform insert', update());
                      _viewRendered$.next(update());
                      break;
                    case ListTemplateChangeType.move:
                      _moveView(
                        item,
                        adjustedPreviousIndex!,
                        index!,
                        count,
                        renderedRange.start + index!
                      );
                      // console.log('perform move', update());
                      _viewRendered$.next(update());
                      break;
                    case ListTemplateChangeType.remove:
                      if (index != null) {
                        _detachAndCacheView(index);
                      }
                      // console.log('perform remove', update());
                      // _viewRendered$.next(update());
                      break;
                    case ListTemplateChangeType.update:
                      _updateView(
                        item,
                        index!,
                        count,
                        renderedRange.start + index!
                      );
                      // console.log('perform update', update());
                      _viewRendered$.next(update());
                      break;
                    case ListTemplateChangeType.context:
                      _updateView(
                        item,
                        index!,
                        count,
                        renderedRange.start + index!
                      );
                      // console.log('perform context', update());
                      _viewRendered$.next(update());
                      break;
                  }
                },
                { ngZone }
              );
            })
          : [],
    };
  }

  function _updateUnchangedContext(
    index: number,
    count: number,
    contextIndex: number
  ) {
    const view = <EmbeddedViewRef<C>>viewContainerRef.get(index);
    view.context.updateContext({
      count,
      index: contextIndex,
    } as any);
    view.detectChanges();
  }

  function _updateView(
    item: T,
    index: number,
    count: number,
    contextIndex: number
  ): void {
    const view = <EmbeddedViewRef<C>>viewContainerRef.get(index);
    updateViewContext(item, view, {
      count,
      index: contextIndex,
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
    count: number,
    contextIndex: number
  ): EmbeddedViewRef<C> | undefined {
    const cachedView = _insertViewFromCache(currentIndex);
    if (cachedView) {
      updateViewContext(value, cachedView, {
        count,
        index: contextIndex,
      } as any);
      cachedView.detectChanges();
      return undefined;
    }
    const context = createViewContext(value, {
      count,
      index: contextIndex,
    });
    const view = viewContainerRef.createEmbeddedView(
      templateRef,
      context,
      currentIndex
    );
    view.detectChanges();
    return view;
  }

  /** Detaches the view at the given index and inserts into the view cache. */
  function _detachAndCacheView(index: number) {
    const detachedView = viewContainerRef.detach(index) as EmbeddedViewRef<C>;
    _maybeCacheView(detachedView);
    detachedView.detectChanges();
  }

  /** Moves view at the previous index to the current index. */
  function _moveView(
    value: T,
    adjustedPreviousIndex: number,
    currentIndex: number,
    count: number,
    contextIndex: number
  ): EmbeddedViewRef<C> {
    const view = viewContainerRef.get(
      adjustedPreviousIndex
    ) as EmbeddedViewRef<C>;
    viewContainerRef.move(view, currentIndex);
    updateViewContext(value, view, {
      count,
      index: contextIndex,
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
      return true;
    } else {
      const index = viewContainerRef.indexOf(view);

      // The host component could remove views from the container outside of
      // the view repeater. It's unlikely this will occur, but just in case,
      // destroy the view on its own, otherwise destroy it through the
      // container to ensure that all the references are removed.
      if (index === -1) {
        view.destroy();
      } else {
        viewContainerRef.remove(index);
      }
      return false;
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
 * @internal
 *
 * @param changes
 * @param items
 */
function getListChanges<T>(
  changes: IterableChanges<T>,
  items: T[]
): ListTemplateChanges<T> {
  const changedIdxs = new Set<T>();
  const changesArr: ListTemplateChange[] = [];
  let notifyParent = false;
  changes.forEachOperation(
    ({ item, previousIndex }, adjustedPreviousIndex, currentIndex) => {
      if (previousIndex == null) {
        // insert
        changesArr.push(getInsertChange(item, currentIndex));
        changedIdxs.add(item);
        notifyParent = true;
      } else if (currentIndex == null) {
        // remove
        changesArr.push(getRemoveChange(item, adjustedPreviousIndex));
        notifyParent = true;
      } else if (adjustedPreviousIndex !== null) {
        // move
        changesArr.push(
          getMoveChange(item, currentIndex, adjustedPreviousIndex)
        );
        changedIdxs.add(item);
        notifyParent = true;
      }
    }
  );
  changes.forEachIdentityChange(({ item, currentIndex }) => {
    if (currentIndex != null && !changedIdxs.has(item)) {
      changesArr.push(getUpdateChange(item, currentIndex));
      changedIdxs.add(item);
    }
  });
  if (notifyParent) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!changedIdxs.has(item)) {
        changesArr.push(getUnchangedChange(item, i));
      }
    }
  }
  return [changesArr, notifyParent];

  // ==========

  function getMoveChange(
    item: T,
    currentIndex: number,
    adjustedPreviousIndex: number
  ): ListTemplateChange<T> {
    return [
      ListTemplateChangeType.move,
      [item, currentIndex, adjustedPreviousIndex],
    ];
  }

  function getUpdateChange(
    item: T,
    currentIndex: number
  ): ListTemplateChange<T> {
    return [ListTemplateChangeType.update, [item, currentIndex]];
  }

  function getUnchangedChange(item: T, index: number): ListTemplateChange<T> {
    return [ListTemplateChangeType.context, [item, index]];
  }

  function getInsertChange(
    item: T,
    currentIndex: number | null
  ): ListTemplateChange<T> {
    return [
      ListTemplateChangeType.insert,
      [item, currentIndex === null ? undefined : currentIndex],
    ];
  }

  function getRemoveChange(
    item: T,
    adjustedPreviousIndex: number | null
  ): ListTemplateChange<T> {
    return [
      ListTemplateChangeType.remove,
      [
        item,
        adjustedPreviousIndex === null ? undefined : adjustedPreviousIndex,
      ],
    ];
  }
}
