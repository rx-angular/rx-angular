import {
  EmbeddedViewRef,
  NgZone,
  RendererFactory2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  onStrategy,
  RxStrategyNames,
  RxStrategyProvider,
} from '@rx-angular/cdk/render-strategies';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LiveCollection } from './list-reconciliation';
import {
  CONTEXT_READS_COUNT,
  CONTEXT_READS_INDEX,
  RxDefaultListViewContext,
  RxListViewComputedContext,
} from './list-view-context';

type View<T = unknown> = EmbeddedViewRef<RxDefaultListViewContext<T>> & {
  _tempView?: boolean;
};

/** A structural change, executed as one render task, in the order it was recorded. */
interface Op<T> {
  view: View<T>;
  run: () => void;
  /** index of a detach op, a later `destroy` turns it into `ViewContainerRef#remove` */
  detachIndex?: number;
  /** set for the last op of a view that stays in the collection */
  finalize?: boolean;
}

/** Pending state of a view, applied once after its last structural change. */
interface ViewState<T> {
  /** latest value, set by `updateValue` */
  value?: T;
  hasValue: boolean;
  /** final index, set by `updateIndexes` */
  index: number;
  lastOp?: Op<T>;
  /** the real view created for a temp view */
  created?: View<T>;
}

export class RxLiveCollection<T> extends LiveCollection<View<T>, T> {
  private _needHostUpdate = false;
  get needHostUpdate() {
    return this._needHostUpdate;
  }
  private _virtualViews: View<T>[] = [];
  private ops: Op<T>[] = [];
  private states = new Map<View<T>, ViewState<T>>();
  /** views that need a context update + change detection, but no structural change */
  private updates: View<T>[] = [];
  private count = 0;
  /** the last flush completed: all contexts carry their index and count */
  private settled = true;
  /**
   * Views detached by an executed task that were not re-attached yet. If a flush is cancelled
   * in between, nobody else references them anymore.
   */
  private detachedViews = new Set<View<T>>();

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
    // Like `detectChanges`, frame DOM changes with begin/end: e.g. the renderer of
    // `@angular/platform-browser/animations` only removes elements on `end`.
    const rendererFactory = this.viewContainer.injector?.get(
      RendererFactory2,
      null,
    );
    const work: (() => void)[] = [];
    for (const op of this.ops) {
      work.push(() => {
        rendererFactory?.begin?.();
        try {
          op.run();
          if (op.finalize) {
            this.finalize(op.view);
          }
        } finally {
          rendererFactory?.end?.();
        }
      });
    }
    for (const view of this.updates) {
      work.push(() => this.finalize(view));
    }
    this.settled = false;
    return combineLatest(
      work.map((w) =>
        onStrategy(null, this.strategyProvider.strategies[strategy], w, {
          ngZone,
        }),
      ),
    ).pipe(tap({ complete: () => (this.settled = true) }));
  }

  override get length(): number {
    return this._virtualViews.length;
  }
  override at(index: number): T {
    return this._virtualViews[index].context.$implicit;
  }
  override attach(index: number, view: View<T>): void {
    this._needHostUpdate = true;
    addToArray(this._virtualViews, index, view);
    this.pushOp(view, () => {
      if (view._tempView) {
        const state = this.states.get(view)!;
        state.created = <View<T>>this.viewContainer.createEmbeddedView(
          this.templateRef,
          this.createViewContext(
            state.hasValue ? state.value! : view.context.$implicit,
            {
              index: state.index,
              count: this.count,
            },
          ),
          { index },
        );
      } else {
        this.detachedViews.delete(view);
        this.viewContainer.insert(view, index);
      }
    });
  }
  override detach(index: number): View<T> {
    const view = removeFromArray(this._virtualViews, index);
    this.pushOp(view, () => {
      this.viewContainer.detach(index);
      this.detachedViews.add(view);
    }).detachIndex = index;
    return view;
  }
  override create(index: number, value: T): View<T> {
    // only a placeholder, the real view is created when the attach task runs
    return <View<T>>(<unknown>{
      context: { $implicit: value, index },
      _tempView: true,
    });
  }
  override destroy(view: View<T>): void {
    this._needHostUpdate = true;
    const lastOp = this.states.get(view)?.lastOp;
    if (lastOp?.detachIndex !== undefined) {
      // reconcile detaches before it destroys: remove the view by index at that point instead.
      // `ViewRef#destroy` on an attached view searches its index in the container, O(n).
      const index = lastOp.detachIndex;
      lastOp.run = () => this.viewContainer.remove(index);
    } else {
      this.pushOp(view, () => view.destroy());
    }
  }
  override updateValue(index: number, value: T): void {
    const state = this.getState(this._virtualViews[index]);
    state.value = value;
    state.hasValue = true;
    // final, unless a structural change follows (then `updateIndexes` sets it)
    state.index = index;
  }

  reset() {
    // a cancelled flush can leave views detached that nobody references anymore
    for (const view of this.detachedViews) {
      view.destroy();
    }
    this.detachedViews.clear();
    this._virtualViews = [];
    this.ops = [];
    this.states.clear();
    this.updates = [];
    for (let i = 0; i < this.viewContainer.length; i++) {
      this._virtualViews[i] = this.viewContainer.get(i) as View<T>;
    }
    this._needHostUpdate = false;
  }

  /**
   * Called after `reconcile`: determines the final index of each view and which views need a
   * render task. Views whose index/count changed, but whose template doesn't read them, get their
   * context updated right away, without change detection.
   */
  updateIndexes() {
    const prevCount = this.count;
    const count = (this.count = this._virtualViews.length);
    if (this.ops.length === 0 && count === prevCount && this.settled) {
      // nothing moved and all contexts are up to date: only values changed
      for (const [view, state] of this.states) {
        if (!Object.is(view.context.$implicit, state.value)) {
          this.updates.push(view);
        }
      }
      return;
    }
    for (let i = 0; i < count; i++) {
      const view = this._virtualViews[i];
      const state = this.states.get(view);
      if (state?.lastOp) {
        // inserted or moved: finalized by its last structural task
        state.index = i;
        state.lastOp.finalize = true;
        continue;
      }
      const context = view.context;
      const current = peek(context);
      const valueChanged =
        state?.hasValue === true && !Object.is(context.$implicit, state.value);
      const indexChanged = current.index !== i;
      const countChanged = current.count !== count;
      if (valueChanged || needsRender(context, indexChanged, countChanged)) {
        this.getState(view).index = i;
        this.updates.push(view);
      } else if (indexChanged || countChanged) {
        // no render needed: only the computed context, `$implicit` would re-emit `item$`
        context.updateContext({ index: i, count });
      }
    }
  }

  private finalize(view: View<T>) {
    const state = this.states.get(view)!;
    if (state.created) {
      state.created.detectChanges();
      return;
    }
    const context = view.context;
    const current = peek(context);
    const value = state.hasValue ? state.value! : context.$implicit;
    const valueChanged = !Object.is(context.$implicit, value);
    const indexChanged = current.index !== state.index;
    const countChanged = current.count !== this.count;
    const render =
      valueChanged || needsRender(context, indexChanged, countChanged);
    const computedContext = { index: state.index, count: this.count };
    if (render) {
      this.updateViewContext(value, view, computedContext);
      view.detectChanges();
    } else if (indexChanged || countChanged) {
      context.updateContext(computedContext);
    }
  }

  private pushOp(view: View<T>, run: () => void): Op<T> {
    const op: Op<T> = { view, run };
    this.ops.push(op);
    this.getState(view).lastOp = op;
    return op;
  }

  private getState(view: View<T>): ViewState<T> {
    let state = this.states.get(view);
    if (state === undefined) {
      state = { hasValue: false, index: -1 };
      this.states.set(view, state);
    }
    return state;
  }
}

/** Only views whose template read `index` / `count` (or values derived from them) need a render. */
function needsRender(
  context: RxDefaultListViewContext<unknown>,
  indexChanged: boolean,
  countChanged: boolean,
): boolean {
  // contexts not extending RxDefaultListViewContext don't track reads
  const reads = context._reads ?? CONTEXT_READS_INDEX | CONTEXT_READS_COUNT;
  return (
    (indexChanged && (reads & CONTEXT_READS_INDEX) !== 0) ||
    (countChanged && (reads & CONTEXT_READS_COUNT) !== 0)
  );
}

/** index and count, without marking them as read */
function peek(
  context: RxDefaultListViewContext<unknown>,
): RxListViewComputedContext {
  return context._peek ? context._peek() : context;
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
