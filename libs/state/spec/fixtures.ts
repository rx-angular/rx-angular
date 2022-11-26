import { RxState } from '@rx-angular/state';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

export function setupState<T extends object>(cfg: { initialState?: T }) {
  const { initialState } = { ...cfg };
  const state = new RxState<T>();
  if (initialState) {
    state.set(initialState);
  }
  return state;
}

type ProjectStateFn<T> = (state: T) => any;

export interface StateChecker<T extends object> {
  checkState: (service: RxState<T>, expectedState: any) => void;
  checkSubscriptions: (service: RxState<T>, expected: any) => void;
}

export function createStateChecker<T extends object>(
  assert: (a: any, e: any) => void
): StateChecker<T> {
  return {
    checkState,
    checkSubscriptions,
  };

  function checkState(
    service: RxState<T>,
    stateOrProject: object,
    project?: ProjectStateFn<T>
  ): void {
    if (typeof stateOrProject === 'object' && project === undefined) {
      assert(service.get(), stateOrProject);
      service
        .select(take(1))
        .subscribe((actual) => assert(actual, stateOrProject));
      return;
    }

    if (typeof stateOrProject === 'object' && typeof project === 'function') {
      assert(project(service.get()), stateOrProject);
      service
        .select(take(1))
        .subscribe((actual) => assert(project(actual), stateOrProject));
      return;
    }

    throw Error(
      'Wrong param. Should be object and optional projection function'
    );
  }

  function checkSubscriptions(service: RxState<T>, numTotalSubs: number): void {
    const actual = (service as any).subscription._finalizers
      ? (service as any).subscription._finalizers.length
      : 0;
    assert(actual, numTotalSubs);
  }
}
