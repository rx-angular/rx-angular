import { jestMatcher } from '@test-helpers';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { selectSlice } from '../../../src/lib/rxjs/operators/selectSlice';
import { KeyCompareMap } from '../../../src/lib/rxjs/interfaces';
import { mergeMap } from 'rxjs/operators';

let testScheduler: TestScheduler;

interface SelectSliceTestObjVal {
  foo?: string;
  bar?: number;
}

interface ISelectSliceTest {
  val?: number;
  valOther?: number;
  objVal?: SelectSliceTestObjVal;
}

beforeEach(() => {
  testScheduler = new TestScheduler(jestMatcher);
});

/** @test {selectSlice} */
describe('selectSlice operator', () => {
  it('should select a slice', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = {
        a: { val: 1, valOther: 2 },
        b: { val: 1, valOther: 4 },
      };
      const expectedValues = {
        a: { valOther: 2 },
        b: { valOther: 4 }
      }
      const e1 = cold<any>('--a--a--a--b--b--a--|', values);
      const e1subs =       '^-------------------!';
      const expected =     '--a--------b-----a--|';

      expectObservable(
        e1.pipe(
          selectSlice(['valOther'])
        )
      ).toBe(expected, expectedValues);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

});

/** @test {selectSlice mirroring selectSlice} */
describe('selectSlice operator', () => {
  it('should distinguish between values', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = { a: { val: 1 }, b: { val: 2 } };
      const e1 =  cold('--a--a--a--b--b--a--|', values);
      const e1subs =   '^-------------------!';
      const expected = '--a--------b-----a--|';

      expectObservable(
        e1.pipe(
          selectSlice(['val'])
        )
      ).toBe(expected, values);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should distinguish between values with multiple keys', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values: {[key: string]: ISelectSliceTest} = { a: { val: 1 }, b: { val: 1, valOther: 3 } };
      const e1 =  cold('--a--a--a--b--b--a--|', values);
      const e1subs =   '^-------------------!';
      const expected = '--a--------b-----a--|';

      expectObservable(
        e1.pipe(
          selectSlice(['val', 'valOther'])
        )
      ).toBe(expected, values);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should ignore changes of other keys', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = { a: { val: 1 }, b: { val: 1, valOther: 3 } };
      const e1 = cold('--a--a--a--b--b--a--|', values);
      const e1subs = '^-------------------!';
      const expected = '--a-----------------|';

      expectObservable(
        e1.pipe(
          selectSlice(['val'])
        )
      ).toBe(expected, values);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should distinguish between values by keyCompareMap', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = {
        a: { val: 1 },
        b: { val: 2 },
        c: {
          val: 2,
          objVal: {
            foo: 'foo',
            bar: 'bar'
          }
        },
        d: {
          val: 2,
          objVal: {
            foo: 'foo2',
            bar: 'bar'
          }
        },
        e: {
          val: 2,
          objVal: {
            foo: 'foo2',
            bar: 'bar3'
          }
        }
      };
      const e1 = cold('--a--a--b--c--d--e--|', values);
      const e1subs = '^-------------------!';
      const expected = '--a-----b--c--d-----|';
      const keyCompare: KeyCompareMap<ISelectSliceTest> = {
        val: (oldVal, newVal) => oldVal === newVal,
        objVal: (oldVal, newVal) => oldVal?.foo === newVal?.foo
      };

      expectObservable(
        e1.pipe(
          selectSlice(['val', 'objVal'], keyCompare)
        )
      ).toBe(expected, values);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should distinguish between values and does not completes', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = { a: { val: 1 }, b: { val: 2 } };
      const e1 =  cold('--a--a--a--b--b--a-', values);
      const e1subs =   '^------------------';
      const expected = '--a--------b-----a-';

      expectObservable(
        e1.pipe(
          selectSlice(['val'])
        )
      ).toBe(expected, values);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should distinguish between values with key set', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values: {[key: string]: ISelectSliceTest} = {
        a: { val: 1 },
        b: { valOther: 1 },
        c: { valOther: 3 },
        d: { val: 1 },
        e: { val: 5 }
      };
      const e1 =  cold('--a--b--c--d--e--|', values);
      const e1subs =   '^----------------!';
      const expected = '--a-----------e--|';

      expectObservable(
        e1.pipe(
          selectSlice(['val'])
        )
      ).toBe(expected, values);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should not emit if source does not have element with key', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values: {[key: string]: ISelectSliceTest} = {
        a: { valOther: 1 },
        b: { valOther: 1 },
        c: { valOther: 3 },
        d: { valOther: 1 },
        e: { valOther: 5 }
      };
      const e1 =  cold('--a--b--c--d--e--|', values);
      const e1subs =   '^----------------!';
      const expected = '-----------------|';

      expectObservable(
        e1.pipe(
          selectSlice(['val'])
        )
      ).toBe(expected, values);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should not completes if source never completes', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const e1 =  cold('-');
      const e1subs =   '^';
      const expected = '-';

      expectObservable(
        (<Observable<any>>e1).pipe(selectSlice(['val']))
      ).toBe(expected);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should not completes if source does not completes', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const e1 =  cold('-');
      const e1subs =   '^';
      const expected = '-';

      expectObservable(
        (<Observable<any>>e1).pipe(selectSlice(['val']))
      ).toBe(expected);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should complete if source is empty', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const e1 =  cold('|');
      const e1subs =   '(^!)';
      const expected = '|';

      expectObservable(
        (<Observable<any>>e1).pipe(selectSlice(['val']))
      ).toBe(expected);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should complete if source does not emit', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const e1 =  cold('------|');
      const e1subs =   '^-----!';
      const expected = '------|';

      expectObservable(
        (<Observable<any>>e1).pipe(selectSlice(['val']))
      ).toBe(expected);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should emit if source emits single element only', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = { a: { val: 1 } };
      const e1 =  cold('--a--|', values);
      const e1subs =   '^----!';
      const expected = '--a--|';

      expectObservable(
        e1.pipe(
          selectSlice(['val'])
        )
      ).toBe(expected, values);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should emit if source is scalar', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = { a: { val: 1 } };
      const e1 = of(values.a);
      const expected = '(a|)';

      expectObservable(
        e1.pipe(
          selectSlice(['val'])
        )
      ).toBe(expected, values);
    });
  });

  it('should raises error if source raises error', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = { a: { val: 1 } };
      const e1 =  cold('--a--a--#', values);
      const e1subs =   '^-------!';
      const expected = '--a-----#';

      expectObservable(
        e1.pipe(
          selectSlice(['val'])
        )
      ).toBe(expected, values);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should raises error if source throws', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const e1 =  cold('#');
      const e1subs =   '(^!)';
      const expected = '#';

      expectObservable(
        (<Observable<any>>e1).pipe(selectSlice(['val']))
      ).toBe(expected);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should not omit if source elements are all different', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = {
        a: { val: 1 },
        b: { val: 2 },
        c: { val: 3 },
        d: { val: 4 },
        e: { val: 5 }
      };
      const e1 =  cold('--a--b--c--d--e--|', values);
      const e1subs =   '^----------------!';
      const expected = '--a--b--c--d--e--|';

      expectObservable(
        e1.pipe(
          selectSlice(['val'])
        )
      ).toBe(expected, values);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should allow unsubscribing early and explicitly', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = {
        a: { val: 1 },
        b: { val: 2 },
        c: { val: 3 },
        d: { val: 4 },
        e: { val: 5 }
      };
      const e1 =  cold('--a--b--b--d--a--e--|', values);
      const e1subs =   '^---------!          ';
      const expected = '--a--b-----          ';
      const unsub =    '----------!          ';

      const result = e1.pipe(
        selectSlice(['val'])
      );

      expectObservable(result, unsub).toBe(expected, values);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should not break unsubscription chains when unsubscribed explicitly', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = {
        a: { val: 1 },
        b: { val: 2 },
        c: { val: 3 },
        d: { val: 4 },
        e: { val: 5 }
      };
      const e1 =  cold('--a--b--b--d--a--e--|', values);
      const e1subs =   '^---------!          ';
      const expected = '--a--b-----          ';
      const unsub =    '----------!          ';

      const result = e1.pipe(
        mergeMap((x: any) => of(x)),
        selectSlice(['val']),
        mergeMap((x: any) => of(x))
      );

      expectObservable(result, unsub).toBe(expected, values);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should emit once if source elements are all same', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = { a: { val: 1 } };
      const e1 =  cold('--a--a--a--a--a--a--|', values);
      const e1subs =   '^-------------------!';
      const expected = '--a-----------------|';

      expectObservable(
        e1.pipe(
          selectSlice(['val'])
        )
      ).toBe(expected, values);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should emit once if comparer returns true always regardless of source emits', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = {
        a: { val: 1 },
        b: { val: 2 },
        c: { val: 3 },
        d: { val: 4 },
        e: { val: 5 }
      };
      const e1 =  cold('--a--b--c--d--e--|', values);
      const e1subs =   '^----------------!';
      const expected = '--a--------------|';

      expectObservable(
        e1.pipe(selectSlice(['val'], {val: () => true}))
      ).toBe(expected, values);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should emit all if comparer returns false always regardless of source emits', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = { a: { val: 1 } };
      const e1 =  cold('--a--a--a--a--a--a--|', values);
      const e1subs =   '^-------------------!';
      const expected = '--a--a--a--a--a--a--|';

      expectObservable(
        e1.pipe(selectSlice(['val'], {val: () => false}))
      ).toBe(expected, values);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should distinguish values by selector', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = {
        a: { val: 1 },
        b: { val: 2 },
        c: { val: 3 },
        d: { val: 4 },
        e: { val: 5 }
      };
      const e1 =  cold('--a--b--c--d--e--|', values);
      const e1subs =   '^----------------!';
      const expected = '--a-----c-----e--|';
      const selector = (x: number, y: number) => y % 2 === 0;

      expectObservable(
        e1.pipe(selectSlice(['val'], {val: selector}))
      ).toBe(expected, values);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should raises error when comparer throws', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = {
        a: { val: 1 },
        b: { val: 2 },
        c: { val: 3 },
        d: { val: 4 },
        e: { val: 5 }
      };
      const e1 =  cold('--a--b--c--d--e--|', values);
      const e1subs =   '^----------!      ';
      const expected = '--a--b--c--#      ';
      const selector = (x: number, y: number) => {
        if (y === 4) {
          throw new Error('error');
        }
        return x === y;
      };

      expectObservable(
        e1.pipe(selectSlice(['val'], {val: selector}))
      ).toBe(expected, values, new Error('error'));
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });
});

