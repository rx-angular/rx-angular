import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { MonoTypeOperatorFunction, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { reconcile } from '../src/lib/list-reconciliation';
import {
  RxDefaultListViewContext,
  RxListViewComputedContext,
} from '../src/lib/list-view-context';
import { RxLiveCollection } from '../src/lib/rx-live-collection';

type Ctx = RxDefaultListViewContext<unknown>;

interface FakeView {
  context: Ctx;
  detectChanges: ReturnType<typeof vi.fn<() => void>>;
  destroy: ReturnType<typeof vi.fn<() => void>>;
}

class FakeViewContainer {
  views: FakeView[] = [];
  removed = 0;
  get length() {
    return this.views.length;
  }
  get(i: number) {
    return this.views[i];
  }
  insert(view: FakeView, i: number) {
    this.views.splice(i, 0, view);
    return view;
  }
  detach(i: number) {
    return this.views.splice(i, 1)[0];
  }
  remove(i: number) {
    this.removed++;
    this.views.splice(i, 1)[0].destroy();
  }
  createEmbeddedView(_: unknown, context: Ctx, { index }: { index: number }) {
    const view = fakeView(context);
    this.views.splice(index, 0, view);
    return view;
  }
}

function fakeView(context: Ctx): FakeView {
  return { context, detectChanges: vi.fn(), destroy: vi.fn() };
}

/** a strategy running its work synchronously, or deferred until `run` is called */
function strategyProvider(deferred = false) {
  const pending: (() => void)[] = [];
  let tasks = 0;
  const behavior =
    ({ work }: { work: () => void }): MonoTypeOperatorFunction<unknown> =>
    (o$) =>
      deferred
        ? new Observable((subscriber) => {
            const task = () => {
              tasks++;
              work();
              subscriber.next(undefined);
              subscriber.complete();
            };
            pending.push(task);
            return () => {
              const i = pending.indexOf(task);
              if (i > -1) pending.splice(i, 1);
            };
          })
        : o$.pipe(tap(() => (tasks++, work())));
  return {
    provider: {
      strategies: { test: { name: 'test', work: () => void 0, behavior } },
    } as unknown as RxStrategyProvider,
    tasks: () => tasks,
    runOne: () => pending.shift()?.(),
  };
}

function setup(items: unknown[], deferred = false) {
  const vcr = new FakeViewContainer();
  vcr.views = items.map((item, index) =>
    fakeView(
      new RxDefaultListViewContext(item, { index, count: items.length }),
    ),
  );
  const strategies = strategyProvider(deferred);
  const live = new RxLiveCollection<unknown>(
    vcr as any,
    {} as any,
    strategies.provider,
    (item, ctx) => new RxDefaultListViewContext(item, ctx),
    (item, view, ctx: RxListViewComputedContext) => {
      view.context.updateContext(ctx);
      view.context.$implicit = item;
    },
  );
  let subscription: Subscription | undefined;
  const render = (next: unknown[], indexIndependent = true) => {
    live.reset();
    reconcile(live, next, (_, v: any) => v?.id ?? v, indexIndependent);
    live.updateIndexes();
    subscription = live.flushQueue('test').subscribe();
  };
  return {
    vcr,
    live,
    strategies,
    render,
    cancel: () => subscription?.unsubscribe(),
    rendered: () => vcr.views.map((v) => v.context.$implicit),
    contexts: () => vcr.views.map((v) => v.context._peek()),
    detectChanges: () =>
      vcr.views.reduce((sum, v) => sum + v.detectChanges.mock.calls.length, 0),
  };
}

const range = (n: number, offset = 0) =>
  Array.from({ length: n }, (_, i) => ({ id: i + offset }));

describe('RxLiveCollection', () => {
  it('should render duplicated values correctly', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    let seed = 3;
    const rnd = (n: number) =>
      Math.floor(((seed = (seed * 16807) % 2147483647) / 2147483647) * n);
    for (let run = 0; run < 2000; run++) {
      const prev = Array.from({ length: rnd(7) }, () => rnd(4));
      const next = Array.from({ length: rnd(7) }, () => rnd(4));
      const { render, rendered, contexts } = setup(prev);
      render(next);
      expect(rendered()).toEqual(next);
      expect(contexts()).toEqual(
        next.map((_, index) => ({ index, count: next.length })),
      );
    }
    warn.mockRestore();
  });

  it('should only schedule work for the swapped views', () => {
    const items = range(100);
    const next = items.slice();
    [next[10], next[90]] = [next[90], next[10]];
    const { render, rendered, contexts, strategies } = setup(items);
    render(next);
    expect(rendered()).toEqual(next);
    expect(contexts()[90]).toEqual({ index: 90, count: 100 });
    // detach + attach for both views, no work for the other 98
    expect(strategies.tasks()).toBe(4);
  });

  it('should not run change detection for index changes the template does not read', () => {
    const items = range(100);
    const { render, rendered, contexts, strategies, detectChanges } =
      setup(items);
    render([{ id: -1 }, ...items]);
    expect(rendered()[0]).toEqual({ id: -1 });
    expect(contexts()).toEqual(
      Array.from({ length: 101 }, (_, index) => ({ index, count: 101 })),
    );
    // only the created view
    expect(strategies.tasks()).toBe(1);
    expect(detectChanges()).toBe(1);
  });

  it('should run change detection for index changes the template reads', () => {
    const items = range(100);
    const { vcr, render, strategies, detectChanges } = setup(items);
    vcr.views.forEach((v) => v.context.index);
    render([{ id: -1 }, ...items]);
    expect(strategies.tasks()).toBe(101);
    expect(detectChanges()).toBe(101);
  });

  it('should run change detection for count changes the template reads', () => {
    const items = range(10);
    const { vcr, render, detectChanges } = setup(items);
    expect(vcr.views[3].context.last).toBe(false);
    render([...items, { id: 10 }]);
    // the created view + the view that read `last`
    expect(detectChanges()).toBe(2);
    expect(vcr.views[3].detectChanges).toHaveBeenCalledTimes(1);
  });

  it('should run change detection for changed values', () => {
    const items = range(10);
    const next = items.slice();
    next[4] = { id: 4 };
    const { vcr, render, rendered, strategies } = setup(items);
    render(next);
    expect(rendered()[4]).toBe(next[4]);
    expect(strategies.tasks()).toBe(1);
    expect(vcr.views[4].detectChanges).toHaveBeenCalledTimes(1);
  });

  it('should remove views by index', () => {
    const items = range(10);
    const { vcr, render } = setup(items);
    const views = vcr.views.slice();
    render(items.filter((_, i) => i % 2 === 0));
    expect(vcr.removed).toBe(5);
    expect(views.filter((v) => v.destroy.mock.calls.length === 1).length).toBe(
      5,
    );
  });

  it('should only visit views with new values when nothing moved', () => {
    const items = range(100);
    const next = items.slice();
    next[50] = { id: 50 };
    const { vcr, render, strategies } = setup(items);
    vcr.views.forEach((v) => v.context.index);
    render(next);
    expect(strategies.tasks()).toBe(1);
    expect(vcr.views[50].context.$implicit).toBe(next[50]);
  });

  it('should update indices that a cancelled render left behind', () => {
    const items = range(10);
    const next = [{ id: -1 }, ...items];
    const { vcr, render, cancel, strategies, contexts } = setup(items, true);
    vcr.views.forEach((v) => v.context.index);
    render(next);
    // the create task runs, the index updates of the shifted views don't
    strategies.runOne();
    cancel();
    // nothing to reconcile anymore, but the indices are stale
    render(next);
    for (let i = 0; i < 20; i++) strategies.runOne();
    expect(contexts()).toEqual(
      next.map((_, index) => ({ index, count: next.length })),
    );
  });

  it('should destroy views orphaned by a cancelled render', () => {
    const items = range(5);
    const { vcr, render, cancel, strategies, rendered } = setup(items, true);
    const moved = vcr.views[0];
    // first item moves to the end: detach (task 1) + attach (task 2)
    render([...items.slice(1), items[0]]);
    strategies.runOne();
    expect(vcr.views).not.toContain(moved);
    cancel();
    render(items.slice(1));
    expect(moved.destroy).toHaveBeenCalledTimes(1);
    expect(rendered()).toEqual(items.slice(1));
  });
});
