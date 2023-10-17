import { EmbeddedViewRef, IterableChanges, ViewRef } from '@angular/core';
import { RxListViewContext } from '@rx-angular/cdk/template';

import { TemplateSettings } from './model';

export interface RxVirtualListChange<T, C> {
  index?: number;
  view?: EmbeddedViewRef<C>;
  item: T;
}

export type RxVirtualListChanges<T, C> = [
  number,
  () => RxVirtualListChange<T, C>,
  boolean? // removed
][];

/**
 * @internal
 *
 * An object that holds methods needed to introduce actions to a list e.g. move, remove, insert
 */
export interface RxVirtualListTemplateManager<T, C> {
  getListChanges(
    changes: IterableChanges<T>,
    items: T[],
    renderCount: number,
    adjustIndexWith: number
  ): [RxVirtualListChanges<T, C>, boolean];
  setItemCount(itemCount: number): void;
  detach(): void;
}

/**
 * @internal
 *
 * Factory that returns a `ListTemplateManager` for the passed params.
 *
 * @param templateSettings
 */
export function createVirtualListTemplateManager<
  C extends RxListViewContext<T>,
  T
>({
  viewContainerRef,
  templateRef,
  createViewContext,
  updateViewContext,
  templateCacheSize,
}: TemplateSettings<T, C, any>): RxVirtualListTemplateManager<T, C> {
  let _viewCache: EmbeddedViewRef<C>[] = [];
  let itemCount = 0;

  return {
    getListChanges,
    setItemCount: (count) => (itemCount = count),
    detach: () => {
      for (let i = 0; i < _viewCache.length; i++) {
        _viewCache[i].destroy();
      }
      _viewCache = [];
    },
  };

  function _updateView(
    item: T,
    index: number,
    count: number,
    contextIndex: number
  ): EmbeddedViewRef<C> {
    const view = <EmbeddedViewRef<C>>viewContainerRef.get(index);
    updateViewContext(item, view, {
      count,
      index: contextIndex,
    });
    view.detectChanges();
    return view;
  }

  /**
   * Inserts a view for a new item, either from the cache or by creating a new
   * one.
   */
  function _insertView(
    value: T,
    count: number,
    adjustIndexWith: number,
    currentIndex?: number
  ): [number, EmbeddedViewRef<C>] {
    currentIndex = currentIndex ?? viewContainerRef.length;
    const contextIndex = currentIndex + adjustIndexWith;
    const cachedView = _insertViewFromCache(currentIndex);
    if (cachedView) {
      updateViewContext(value, cachedView, {
        count,
        index: contextIndex,
      });
      cachedView.detectChanges();
      return [currentIndex, cachedView];
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
    return [currentIndex, view];
  }

  /** Detaches the view at the given index and inserts into the view cache. */
  function _detachAndCacheView(index: number | undefined) {
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
    const oldView = viewContainerRef.get(adjustedPreviousIndex);
    const view = <EmbeddedViewRef<C>>(
      viewContainerRef.move(oldView as ViewRef, currentIndex)
    );
    updateViewContext(value, view, {
      count,
      index: contextIndex,
    });
    view.detectChanges();
    return view;
  }

  /**
   * Cache the given detached view. If the cache is full, the view will be
   * destroyed.
   */
  function _maybeCacheView(view: EmbeddedViewRef<C>) {
    if (_viewCache.length < templateCacheSize) {
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
  function _insertViewFromCache(index?: number): EmbeddedViewRef<C> | null {
    const cachedView = _viewCache.pop();
    if (cachedView) {
      return <EmbeddedViewRef<C>>viewContainerRef.insert(cachedView, index);
    }
    return null;
  }

  /**
   * @internal
   */
  function getListChanges(
    changes: IterableChanges<T>,
    items: T[],
    count: number,
    adjustIndexWith: number
  ): [RxVirtualListChanges<T, C>, boolean] {
    const changedIdxs = new Set<T>();
    const listChanges: RxVirtualListChanges<T, C> = [];
    let notifyParent = false;
    let appendedAtEnd = 0;
    const otherMovedIds: number[] = [];
    changes.forEachOperation(
      ({ item, previousIndex }, adjustedPreviousIndex, currentIndex) => {
        if (previousIndex == null) {
          // insert
          const index = currentIndex === null ? undefined : currentIndex;
          listChanges.push([
            index ?? items.length + appendedAtEnd,
            () => {
              const [insertedIndex, view] = _insertView(
                item,
                count,
                adjustIndexWith,
                index
              );
              return {
                view,
                index: insertedIndex,
                item,
              };
            },
          ]);
          if (index === undefined) {
            appendedAtEnd++;
          }
          changedIdxs.add(item);
          notifyParent = true;
        } else if (currentIndex == null) {
          // remove
          listChanges.push([
            adjustedPreviousIndex as number,
            () => {
              _detachAndCacheView(adjustedPreviousIndex ?? undefined);
              return { item };
            },
            true,
          ]);
          notifyParent = true;
        } else if (adjustedPreviousIndex !== null) {
          // move
          listChanges.push([
            currentIndex,
            () => {
              const view = _moveView(
                item,
                adjustedPreviousIndex,
                currentIndex,
                count,
                currentIndex + adjustIndexWith
              );
              return {
                view,
                index: currentIndex,
                item,
              };
            },
          ]);
          otherMovedIds.push(adjustedPreviousIndex);
          changedIdxs.add(item);
          notifyParent = true;
        }
      }
    );
    changes.forEachIdentityChange(({ item, currentIndex }) => {
      if (currentIndex != null && !changedIdxs.has(item)) {
        listChanges.push([
          currentIndex,
          () => {
            const view = _updateView(
              item,
              currentIndex,
              count,
              currentIndex + adjustIndexWith
            );
            return {
              view,
              index: currentIndex,
              item,
            };
          },
        ]);
        changedIdxs.add(item);
      }
    });
    for (let i = 0; i < otherMovedIds.length; i++) {
      const itemIndex = otherMovedIds[i];
      const item = items[itemIndex];
      if (item && !changedIdxs.has(item)) {
        changedIdxs.add(item);
        listChanges.push([
          itemIndex,
          () => {
            const view = _updateView(
              item,
              itemIndex,
              count,
              itemIndex + adjustIndexWith
            );
            return {
              view,
              index: itemIndex,
              item,
            };
          },
        ]);
      }
    }
    if (itemCount !== count && changedIdxs.size < items.length) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!changedIdxs.has(item)) {
          listChanges.push([
            i,
            () => {
              const view = _updateView(item, i, count, i + adjustIndexWith);
              return {
                view,
                index: i,
                item,
              };
            },
          ]);
        }
      }
    }
    return [listChanges, notifyParent];
  }
}
