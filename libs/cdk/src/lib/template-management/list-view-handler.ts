import { TemplateSettings } from './model';
import { EmbeddedViewRef, IterableChanges } from '@angular/core';
import { RxListViewContext } from './list-view-context';
import { templateHandling } from './utils';

const enum RxListTemplateChange {
  insert,
  remove,
  move,
  update,
  context,
}

type RxListTemplateChanges = [[RxListTemplateChange, any][], boolean];

/**
 * @internal
 *
 * Factory that returns a `ListTemplateManager` for the passed params.
 *
 * @param templateSettings
 */
export function getTemplateHandler<C extends RxListViewContext<T>, T>(
  templateSettings: TemplateSettings<T, C>
): ListTemplateManager<T> {
  const {
    viewContainerRef,
    initialTemplateRef,
    createViewContext,
    updateViewContext,
    createViewFactory,
    patchZone,
  } = templateSettings;
  const templates = templateHandling(
    viewContainerRef,
    patchZone,
    createViewFactory
  );

  return {
    updateUnchangedContext,
    insertView,
    moveView,
    updateView,
    removeView,
    getListChanges,
  };

  // =====

  function updateUnchangedContext(index: number, count: number) {
    const view = <EmbeddedViewRef<C>>viewContainerRef.get(index);
    view.context.updateContext({
      count,
      index,
    });
    view.detectChanges();
  }

  function moveView(
    oldIndex: number,
    item: T,
    index: number,
    count: number
  ): void {
    const oldView = viewContainerRef.get(oldIndex);
    const view = <EmbeddedViewRef<C>>viewContainerRef.move(oldView, index);
    updateViewContext(item, view, {
      count,
      index,
    });
    view.detectChanges();
  }

  function updateView(item: T, index: number, count: number): void {
    const view = <EmbeddedViewRef<C>>viewContainerRef.get(index);
    updateViewContext(item, view, {
      count,
      index,
    });
    view.detectChanges();
  }

  function removeView(index: number): void {
    viewContainerRef.remove(index);
  }

  function insertView(item: T, index: number, count: number): void {
    const newView = templates.createEmbeddedView(
      initialTemplateRef,
      createViewContext(item, {
        count,
        index,
      }),
      index
    );
    newView.detectChanges();
  }
}

/**
 * @internal
 *
 * An object that holds methods needed to introduce actions to a list e.g. move, remove, insert
 */
export interface ListTemplateManager<T> {
  updateUnchangedContext(index: number, count: number): void;

  insertView(item: T, index: number, count: number): void;

  moveView(oldIndex: number, item: T, index: number, count: number): void;

  updateView(item: T, index: number, count: number): void;

  removeView(index: number): void;

  getListChanges(
    changes: IterableChanges<T>,
    items: T[]
  ): RxListTemplateChanges;
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
  const changesArr = [];
  let notifyParent = false;
  changes.forEachOperation((record, adjustedPreviousIndex, currentIndex) => {
    const item = record.item;
    if (record.previousIndex == null) {
      // insert
      changesArr.push(getInsertChange(item, currentIndex));
      changedIdxs.add(item);
      notifyParent = true;
    } else if (currentIndex == null) {
      // remove
      changesArr.push(getRemoveChange(item, adjustedPreviousIndex));
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
    changesArr.push(getUpdateChange(item, record.currentIndex));
    changedIdxs.add(item);
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
  ): [RxListTemplateChange, any] {
    return [
      RxListTemplateChange.move,
      [item, currentIndex, adjustedPreviousIndex],
    ];
  }

  function getUpdateChange(
    item: T,
    currentIndex: number
  ): [RxListTemplateChange, any] {
    return [RxListTemplateChange.update, [item, currentIndex]];
  }

  function getUnchangedChange(
    item: T,
    index: number
  ): [RxListTemplateChange, any] {
    return [RxListTemplateChange.context, [item, index]];
  }

  function getInsertChange(
    item: T,
    currentIndex: number
  ): [RxListTemplateChange, any] {
    return [
      RxListTemplateChange.insert,
      [item, currentIndex === null ? undefined : currentIndex],
    ];
  }

  function getRemoveChange(
    item: T,
    adjustedPreviousIndex: number
  ): [RxListTemplateChange, any] {
    return [
      RxListTemplateChange.remove,
      adjustedPreviousIndex === null ? undefined : adjustedPreviousIndex,
    ];
  }
}
