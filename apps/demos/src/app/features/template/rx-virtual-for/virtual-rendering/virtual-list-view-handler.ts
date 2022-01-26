import { EmbeddedViewRef, IterableChanges } from '@angular/core';
import {
  onStrategy,
  RxStrategyCredentials,
} from '@rx-angular/cdk/render-strategies';
import { RxListViewContext } from '@rx-angular/cdk/template';
import { Observable } from 'rxjs';
import {
  RxListTemplateChange,
  RxListTemplateChanges,
  RxListTemplateChangeType,
  RxTemplateSettings,
} from '../../../../../../../../libs/cdk/template/src/lib/model';
import { ListRange } from './model';

/**
 * @internal
 *
 * An object that holds methods needed to introduce actions to a list e.g. move, remove, insert
 */
export interface RxVirtualListTemplateManager<T> {
  toTemplateWork(
    iterableChanges: IterableChanges<T>,
    items: T[],
    renderedRange: ListRange,
    strategy: RxStrategyCredentials,
    count: number
  ): {
    insertedOrRemoved: boolean;
    work$: Observable<RxListTemplateChanges>[] | any[];
  };
  detach(): void;
}

/**
 * @internal
 *
 * Factory that returns a `ListTemplateManager` for the passed params.
 *
 * @param templateSettings
 */
export function getVirtualTemplateHandler<C extends RxListViewContext<T>, T>(
  templateSettings: RxTemplateSettings<T, C> & {
    viewCacheSize: number;
  }
): RxVirtualListTemplateManager<T> {
  const {
    viewContainerRef,
    initialTemplateRef,
    createViewContext,
    updateViewContext,
    patchZone,
    viewCacheSize,
  } = templateSettings;

  const workFactory = patchZone
    ? (work: VoidFunction) => patchZone.run(work)
    : (work: VoidFunction) => work();

  let _viewCache: EmbeddedViewRef<C>[] = [];

  return {
    toTemplateWork,
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
    count: number
  ) {
    const listChanges = getListChanges(iterableChanges, items);
    const changes = listChanges[0];
    const insertedOrRemoved = listChanges[1];
    return {
      insertedOrRemoved,
      work$:
        changes.length > 0
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
                      _insertView(
                        payload[0],
                        payload[1],
                        count,
                        renderedRange.start + payload[1]
                      );
                      break;
                    case RxListTemplateChangeType.move:
                      // console.log('perform move', payload);
                      _moveView(
                        payload[0],
                        payload[2],
                        payload[1],
                        count,
                        renderedRange.start + payload[1]
                      );
                      break;
                    case RxListTemplateChangeType.remove:
                      // console.log('perform remove', payload);
                      _detachAndCacheView(payload[1] as any);
                      break;
                    case RxListTemplateChangeType.update:
                      // console.log('perform update', payload);
                      _updateView(
                        payload[0],
                        payload[1],
                        count,
                        renderedRange.start + payload[1]
                      );
                      break;
                    case RxListTemplateChangeType.context:
                      // console.log('perform context', payload);
                      _updateUnchangedContext(
                        payload[1],
                        count,
                        renderedRange.start + payload[1]
                      );
                      break;
                  }
                },
                {}
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
    templateSettings.updateViewContext(item, view, {
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
      initialTemplateRef,
      context,
      currentIndex
    );
    view.detectChanges();
    return view;
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
    count: number,
    contextIndex: number
  ): EmbeddedViewRef<C> {
    const view = viewContainerRef.get(
      adjustedPreviousIndex
    ) as EmbeddedViewRef<C>;
    viewContainerRef.move(view, currentIndex);
    updateViewContext(value, view, {
      count,
      index: currentIndex,
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
 * @internal
 *
 * @param changes
 * @param items
 */
function getListChanges<T>(
  changes: IterableChanges<T>,
  items: T[]
): RxListTemplateChanges {
  const changedIdxs = new Set<T>();
  const changesArr: RxListTemplateChange[] = [];
  let notifyParent = false;
  changes.forEachOperation((record, adjustedPreviousIndex, currentIndex) => {
    const item = record.item;
    if (record.previousIndex == null) {
      // insert
      changesArr.push(
        getInsertChange(item, currentIndex === null ? undefined : currentIndex)
      );
      changedIdxs.add(item);
      notifyParent = true;
    } else if (currentIndex == null) {
      // remove
      changesArr.push(
        getRemoveChange(
          item,
          adjustedPreviousIndex === null ? undefined : adjustedPreviousIndex
        )
      );
      changedIdxs.add(item);
      notifyParent = true;
    } else if (adjustedPreviousIndex !== null) {
      // move
      changesArr.push(getMoveChange(item, currentIndex, adjustedPreviousIndex));
      changedIdxs.add(item);
      notifyParent = true;
    }
  });
  changes.forEachIdentityChange((record) => {
    const item = record.item;
    if (!changedIdxs.has(item)) {
      changesArr.push(getUpdateChange(item, record.currentIndex));
      changedIdxs.add(item);
    }
  });
  items.forEach((item, index) => {
    if (!changedIdxs.has(item)) {
      changesArr.push(getUnchangedChange(item, index));
    }
  });
  return [changesArr, notifyParent];

  // ==========

  function getMoveChange(
    item: T,
    currentIndex: number,
    adjustedPreviousIndex: number
  ): RxListTemplateChange {
    return [
      RxListTemplateChangeType.move,
      [item, currentIndex, adjustedPreviousIndex],
    ];
  }

  function getUpdateChange(
    item: T,
    currentIndex: number
  ): RxListTemplateChange {
    return [RxListTemplateChangeType.update, [item, currentIndex]];
  }

  function getUnchangedChange(item: T, index: number): RxListTemplateChange {
    return [RxListTemplateChangeType.context, [item, index]];
  }

  function getInsertChange(
    item: T,
    currentIndex: number
  ): RxListTemplateChange {
    return [
      RxListTemplateChangeType.insert,
      [item, currentIndex === null ? undefined : currentIndex],
    ];
  }

  function getRemoveChange(
    item: T,
    adjustedPreviousIndex: number
  ): RxListTemplateChange {
    return [
      RxListTemplateChangeType.remove,
      [
        item,
        adjustedPreviousIndex === null ? undefined : adjustedPreviousIndex,
      ],
    ];
  }
}
