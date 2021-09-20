import { ɵglobal } from '@angular/core';
import { TestScheduler } from 'rxjs/testing';
import * as rxjs from 'rxjs';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { jestMatcher } from '@test-helpers';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { accumulateObservables, animationFrameScheduler, RX_NATIVE_STRATEGIES } from '@rx-angular/cdk';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { coalesceWith } from '@rx-angular/cdk/coalescing';
import { BehaviorSubject, from, Observable, observeOn, of } from 'rxjs';


let testScheduler: TestScheduler;
let handles = [];
let animationRuns = 0;
function animate() {
  handles.forEach(handle => handle());
}
beforeEach(() => {
  testScheduler = new TestScheduler(jestMatcher);
  animationRuns = 0;
  handles = [];
  ɵglobal.requestAnimationFrame = (cb?) => {
    handles[animationRuns] = cb;
    animationRuns++;
    return animationRuns;
  }
  ɵglobal.cancelAnimationFrame = (id: number) => {
    handles = handles.splice(id, 1);
  }
});

// tslint:disable: no-duplicate-string
describe('local strategy', () => {
  it('should run on animationFrame', () => {
    const values$ = from([1,2,3]);
    const work = jest.fn();
    values$.pipe(
      RX_NATIVE_STRATEGIES.local.behavior(work)
    ).subscribe();
    expect(work).not.toHaveBeenCalled();
    animate();
    expect(work).toHaveBeenCalled();
  });
});
