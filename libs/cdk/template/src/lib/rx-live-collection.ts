import {
  EmbeddedViewRef,
  NgZone,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  onStrategy,
  RxStrategyNames,
  RxStrategyProvider,
} from '@rx-angular/cdk/render-strategies';
import { combineLatest } from 'rxjs';
import { LiveCollection } from './list-reconciliation';
import {
  RxDefaultListViewContext,
  RxListViewComputedContext,
} from './list-view-context';

type View<T = unknown> = EmbeddedViewRef<RxDefaultListViewContext<T>> & {
  _tempView?: boolean;
};

class WorkQueue<T> {
  private queue = new Map<
    T,
    {
      work: () => View<T>;
      type: 'attach' | 'detach' | 'remove' | 'update';
      order: number;
    }[]
  >();

  private length = 0;

  constructor(private strategyProvider: RxStrategyProvider) {}

  patch(
    view: T,
    data: {
      work: () => View<T> | undefined;
      type: 'attach' | 'detach' | 'remove' | 'update';
    },
  ) {
    if (this.queue.has(view)) {
      const entries = this.queue.get(view);
      const lastEntry = entries[entries.length - 1];
      /*console.log(
        'patch I has a work in queue',
        data.type,
        this.queue.get(view).map((w) => w.type),
      );*/
      const work = lastEntry.work;
      lastEntry.work = () => {
        const view = work();
        const view2 = data.work();
        return view ?? view2;
      };
    } else {
      this.set(view, data);
    }
  }

  override(
    view: T,
    data: {
      work: () => View<T> | undefined;
      type: 'attach' | 'detach' | 'remove' | 'update';
    },
  ) {
    if (this.queue.has(view)) {
      const entries = this.queue.get(view);
      const lastEntry = entries[entries.length - 1];
      this.queue.set(view, [
        {
          work: data.work,
          type: 'remove',
          order: lastEntry.order,
        },
      ]);
    } else {
      this.set(view, data);
    }
  }

  set(
    view: T,
    data: {
      work: () => View<T> | undefined;
      type: 'attach' | 'detach' | 'remove' | 'update';
    },
  ) {
    if (this.queue.has(view)) {
      /* console.log(
        'I has a work in queue',
        data.type,
        this.queue.get(view).map((w) => w.type),
      );*/
      this.queue
        .get(view)
        .push({ work: data.work, type: data.type, order: this.length++ });
    } else {
      this.queue.set(view, [
        { work: data.work, type: data.type, order: this.length++ },
      ]);
    }
  }

  flush(strategy: RxStrategyNames, ngZone?: NgZone) {
    // console.log('operations', this.length);
    return combineLatest(
      Array.from(this.queue.values())
        .flatMap((entry) => entry)
        .sort((a, b) => a.order - b.order)
        .map(({ work }) => {
          // console.log('operation', type);
          return onStrategy(
            null,
            this.strategyProvider.strategies[strategy],
            () => {
              // console.log('exec order', order, type);
              const view = work();
              view?.detectChanges();
            },
            { ngZone },
          );
        }),
    );
  }

  clear() {
    this.queue.clear();
    this.length = 0;
  }
}

export class RxLiveCollection<T> extends LiveCollection<View<T>, T> {
  /**
   Property indicating if indexes in the repeater context need to be updated following the live
   collection changes. Index updates are necessary if and only if views are inserted / removed in
   the middle of LContainer. Adds and removals at the end don't require index updates.
   */
  private needsIndexUpdate = false;
  private _needHostUpdate = false;
  private set needHostUpdate(needHostUpdate: boolean) {
    this._needHostUpdate = needHostUpdate;
  }
  get needHostUpdate() {
    return this._needHostUpdate;
  }
  private lastCount: number | undefined = undefined;
  private workQueue = new WorkQueue<T>(this.strategyProvider);
  private _virtualViews: View<T>[];

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<{ $implicit: unknown; index: number }>,
    private strategyProvider: RxStrategyProvider,
    private createViewContext: (
      item: T,
      context: RxListViewComputedContext,
    ) => RxDefaultListViewContext<T>,
    private updateViewContext: (
      item: T,
      view: View<T>,
      context: RxListViewComputedContext,
    ) => void,
  ) {
    super();
  }

  flushQueue(strategy: RxStrategyNames, ngZone?: NgZone) {
    return this.workQueue.flush(strategy, ngZone);
  }

  override get length(): number {
    return this._virtualViews.length;
  }
  override at(index: number): T {
    // console.log('live-coll: at', { index });
    return this.getView(index).context.$implicit;
  }
  override attach(index: number, view: View<T>): void {
    this.needsIndexUpdate ||= index !== this.length;
    this.needHostUpdate = true;

    addToArray(this._virtualViews, index, view);
    // console.log('live-coll: attach', { index, existingWork });
    this.workQueue.set(view.context.$implicit, {
      work: () => {
        return this.attachView(view, index);
      },
      type: 'attach',
    });
  }
  private attachView(view: View<T>, index: number): View<T> {
    if (view._tempView) {
      // fake view
      return (this._virtualViews[index] = <View<T>>(
        this.viewContainer.createEmbeddedView(
          this.templateRef,
          this.createViewContext(view.context.$implicit, {
            index,
            count: this.length,
          }),
          { index },
        )
      ));
    }
    // TODO: this is only here because at the time of `create` we don't have information about the count yet
    this.updateViewContext(view.context.$implicit, view, {
      index,
      count: this.length,
    });
    return <View<T>>this.viewContainer.insert(view, index);
  }
  override detach(index: number) {
    this.needsIndexUpdate ||= index !== this.length - 1;
    const detachedView = removeFromArray(this._virtualViews, index);
    // console.log('live-coll: detach', { index, existingWork });
    this.workQueue.set(detachedView.context.$implicit, {
      work: () => {
        // return undefined, to prevent `.detectChanges` being called
        return this.detachView(index);
      },
      type: 'detach',
    });

    return detachedView;
  }
  private detachView(index: number) {
    this.viewContainer.detach(index);
    return undefined;
  }

  override create(index: number, value: T) {
    // console.log('live-coll: create', { index, value });
    // only create a fake EmbeddedView
    return <View<T>>{
      context: { $implicit: value, index },
      _tempView: true,
    };
  }

  override destroy(view: View<T>): void {
    // console.log('live-coll: destroy', { existingWork });
    this.needHostUpdate = true;
    this.workQueue.override(view.context.$implicit, {
      work: () => {
        this.destroyView(view);
        // return undefined, to prevent `.detectChanges` being called
        return undefined;
      },
      type: 'remove',
    });
  }
  private destroyView(view: View<T>): View<T> {
    view.destroy();
    return view;
  }
  override updateValue(index: number, value: T): void {
    const view = this.getView(index);
    // console.log('live-coll: updateValue', { index, value, existingWork });
    this.workQueue.patch(view.context.$implicit, {
      work: () => {
        return this.updateView(value, index, view);
      },
      type: 'update',
    });
  }

  private updateView(value: T, index: number, view: View<T>): View<T> {
    this.updateViewContext(value, view, { index, count: this.length });
    return view;
  }

  reset() {
    this._virtualViews = [];
    this.workQueue.clear();
    for (let i = 0; i < this.viewContainer.length; i++) {
      this._virtualViews[i] = this.viewContainer.get(i) as View<T>;
    }
    this.needsIndexUpdate = false;
    this.needHostUpdate = false;
  }

  updateIndexes() {
    const count = this.length;
    if (
      this.needsIndexUpdate ||
      (this.lastCount !== undefined && this.lastCount !== count)
    ) {
      // console.log('live-coll: updateIndexes');
      for (let i = 0; i < count; i++) {
        const view = this.getView(i);
        this.workQueue.patch(view.context.$implicit, {
          work: () => {
            const v = this.getView(i);
            if (v.context.index !== i || v.context.count !== count) {
              return this.updateView(v.context.$implicit, i, v);
            }
          },
          type: 'update',
        });
      }
    }
    this.lastCount = count;
  }

  private getView(index: number) {
    return (
      this._virtualViews[index] ?? (this.viewContainer.get(index) as View<T>)
    );
  }
}

function addToArray(arr: any[], index: number, value: any): void {
  // perf: array.push is faster than array.splice!
  if (index >= arr.length) {
    arr.push(value);
  } else {
    arr.splice(index, 0, value);
  }
}

function removeFromArray<T>(arr: T[], index: number): T {
  // perf: array.pop is faster than array.splice!
  if (index >= arr.length - 1) {
    return arr.pop();
  } else {
    return arr.splice(index, 1)[0];
  }
}
