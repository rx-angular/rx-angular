import { jestMatcher } from '@test-helpers';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { selectSlice } from '../../../src/lib/rxjs/operators/selectSlice';

let testScheduler: TestScheduler;

interface SelectSliceTestObjVal {
  foo?: string;
  bar?: number;
}

interface ISelectSliceTest {
  val?: number;
  valOther?: number;
  strVal?: string;
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
        b: { val: 2, valOther: 4 },
        c: { valOther: 2 },
        d: { valOther: 4 }
      };
      const e1 = cold('--a--a--a--b--b--a--|', values);
      const e1subs = '^-------------------!';
      const expected = '--c--------d-----c--|';

      expectObservable(
        (<Observable<ISelectSliceTest>>e1).pipe(
          selectSlice(['valOther'])
        )
      ).toBe(expected, values);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });
});
