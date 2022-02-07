import { TestScheduler } from 'rxjs/testing';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { jestMatcher } from '@test-helpers';

import { smosh } from '@rx-angular/state/selections';
import { coalesceWith } from '@rx-angular/cdk/coalescing';
import { from, Observable, of } from 'rxjs';

let testScheduler: TestScheduler;

interface ViewModelTest {
  prop1?: number;
  prop2?: string;
  prop3?: boolean;
}

const _: any = undefined;
const a = 'a';
const b = 'b';
const c = 'c';
const t = true;
const f = false;
const h = 0;
const i = 1;
const j = 2;

/**
 * {
 *  prop1: h,
 *  prop2: a,
 *  prop3: f,
 * }
 */
const u = {
  prop1: h,
  prop2: a,
  prop3: f,
};
/**
 * {
 *  prop1: i,
 *  prop2: a,
 *  prop3: f,
 * }
 */
const v = {
  prop1: i,
  prop2: a,
  prop3: f,
};
/**
 * {
 *  prop1: i,
 *  prop2: b,
 *  prop3: f,
 * }
 */
const w = {
  prop1: i,
  prop2: b,
  prop3: f,
};
/**
 * {
 *  prop1: i,
 *  prop2: b,
 *  prop3: t,
 * }
 */
const x = {
  prop1: i,
  prop2: b,
  prop3: t,
};

/**
 * {
 *  prop1: h,
 *  prop2: a,
 *  prop3: t,
 * }
 */
const viewModel1 = {
  prop1: h,
  prop2: a,
  prop3: t,
};

beforeEach(() => {
  testScheduler = new TestScheduler(jestMatcher);
});

// tslint:disable: no-duplicate-string
describe('createSmoshObservable', () => {
  it('should return an observable', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const vm$: Observable<ViewModelTest> = smosh({
        prop1: of(1),
        prop2: of('42'),
        prop3: of(true)
      });
      expect(vm$.subscribe).toBeDefined();
      expect(vm$.subscribe().unsubscribe).toBeDefined();
    });
  });

  it('should return observable that emits if only static values are used', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const vm$: Observable<ViewModelTest> = smosh({
        prop1: i,
        prop2: b,
        prop3: t,
      },        cold('s'))
      const expected = '(x|)';
      expectObservable(vm$).toBe(expected, { x });
    });
  });

  it('should return observable that emits when all static and observable sources emitted at least once', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const vm$: Observable<ViewModelTest> = smosh({
        prop1: cold('h-h-i-', { h, i }),
        prop2: cold('--a-b-', { a, b }),
        prop3: t,
      }, cold(      's'))
      const expected = '----x-';
      expectObservable(vm$).toBe(expected, { x });
    });
  });

  it('should return observable that not emit when all static and observable sources emitted not at least once', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const vm$: Observable<ViewModelTest> = smosh({
        prop1: cold('h-h-i-', { h, i }),
        prop2: cold('--a-b-', { a, b }),
        prop3: undefined,
      }, cold(      's'))
      const expected = '----x-';
      expectObservable(vm$).toBe(expected, { x });
    });
  });

  it('should return observable that emits when all sources emitted at least once', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const vm$: Observable<ViewModelTest> = smosh({
        prop1: cold('h-h-i-', { h, i }),
        prop2: cold('--a-b-', { a, b }),
        prop3: cold('----t-', { t }),
      }, cold(      's'))
      const expected = '----x-';
      expectObservable(vm$).toBe(expected, { x });
    });
  });

  it('should return observable that not emit when all sources emitted not at least once', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const vm$: Observable<ViewModelTest> = smosh({
        prop1: cold('h-h-i-', { h, i }),
        prop2: cold('--a-b-', { a, b }),
        prop3: cold('------', { t }),
      }, cold(      's'))
      const expected = '------';
      expectObservable(vm$).toBe(expected);
    });
  });


  it('should emit last for sync values when durationSelector is a Promise', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const durationSelector = from(Promise.resolve(1));
      const s1 = cold('(abcdef|)');
      const exp = '(f|)';

      const result = s1.pipe(coalesceWith(durationSelector));
      expectObservable(result).toBe(exp);
    });
  });

  it('should return observable that does not emits when not all sources emitted at least once', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const vm$: Observable<ViewModelTest> = smosh({
        prop1: cold('h-h-i-', { h, i }),
        prop2: cold('--a-b-', { a, b }),
        prop3: cold<boolean>('------'),
      });
      const expected = '------';
      expectObservable(vm$).toBe(expected);
    });
  });

  it('should return observable that emits only distinct values  --  should distinguish between values', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const values = { u, v, w, x };
      const vm$: Observable<ViewModelTest> = smosh({
        prop1: cold('h-h-i-i-i-i', { h, i }),
        prop2: cold('a-a-a-b-b-b', { a, b }),
        prop3: cold('f-f-f-f-t-t', { f, t }),
      }, cold('s'));
      const expected = 'u---v-w-x--';
      expectObservable(vm$).toBe(expected, values);
    });
  });

  it('should ignore changes if any key is undefined', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const values = { u, v, w, x };
      const vm$: Observable<ViewModelTest> = smosh({
        prop1: cold('h-h-i-i-i-i-i', { h, i }),
        prop2: cold('_-a-a-_-b-_-b', { _, a, b }),
        prop3: cold('f-f-f-f-f-t-t', { f, t }),
      }, cold('s'));
      const expected = '--u-v---w-x--';
      expectObservable(vm$).toBe(expected, values);
    });
  });

  it('should return observable that shares the composition', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = { u, v, w, x };
      const prop1$ = cold('--h--', { h, i });
      const prop2$ = cold('--a--', { a, b });
      const prop3$ = cold('--f--', { f });
      const vm$: Observable<ViewModelTest> = smosh({
        prop1: prop1$,
        prop2: prop2$,
        prop3: prop3$,
      }, cold('s'));
      const psubs = '^----';
      const expected = '--u--';

      expectObservable(vm$).toBe(expected, values);
      expectSubscriptions(prop1$.subscriptions).toBe(psubs);
      expectSubscriptions(prop2$.subscriptions).toBe(psubs);
      expectSubscriptions(prop3$.subscriptions).toBe(psubs);
    });
  });

  it('should replay the last emitted value', () => {
    testScheduler.run(({ cold, expectObservable }) => {});
  });

  it('should return observable that coalesce sync emissions caused by combineLatest (over emitting)', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = { u, v, w, x };
      const prop1$ = cold('--h--i-', { h, i });
      const prop2$ = cold('--a--b-', { a, b });
      const prop3$ = cold('--f--t-', { f, t });
      const vm$: Observable<ViewModelTest> = smosh({
        prop1: prop1$,
        prop2: prop2$,
        prop3: prop3$,
      }, cold('s'));
      const psubs =    '^------';
      const expected = '--u--x-';

      expectObservable(vm$).toBe(expected, values);
      expectSubscriptions(prop1$.subscriptions).toBe(psubs);
      expectSubscriptions(prop2$.subscriptions).toBe(psubs);
      expectSubscriptions(prop3$.subscriptions).toBe(psubs);
    });
  });

  it('should return observable that coalesce sync emissions caused by sync emissions (over emitting)', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = { u, v, w, x };
      const prop1$ = cold('(hhi)', { h, i });
      const prop2$ = cold('(abb)', { a, b });
      const prop3$ = cold('(fft)', { f, t });
      const vm$: Observable<ViewModelTest> = smosh({
        prop1: prop1$,
        prop2: prop2$,
        prop3: prop3$,
      }, cold('s'));
      const psubs =    '^------';
      const expected = 'x';

      expectObservable(vm$).toBe(expected, values);
      expectSubscriptions(prop1$.subscriptions).toBe(psubs);
      expectSubscriptions(prop2$.subscriptions).toBe(psubs);
      expectSubscriptions(prop3$.subscriptions).toBe(psubs);
    });
  });

  it('should return observable that coalesce by a custom duration (edge-case)', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = { u, v, w, x };
      const prop1$ = cold('h--i', { h, i });
      const prop2$ = cold('a--b', { a, b });
      const prop3$ = cold('f--t', { f, t });
      const vm$: Observable<ViewModelTest> = smosh({
        prop1: prop1$,
        prop2: prop2$,
        prop3: prop3$,
      },          cold('-----s'));
      const psubs =    '^-----';
      const expected = '-----x';

      expectObservable(vm$).toBe(expected, values);
      expectSubscriptions(prop1$.subscriptions).toBe(psubs);
      expectSubscriptions(prop2$.subscriptions).toBe(psubs);
      expectSubscriptions(prop3$.subscriptions).toBe(psubs);
    });
  });
});
