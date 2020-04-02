import { RxState } from '@ngx-rx/ngx-rx-state';
import { take } from 'rxjs/operators';

export interface PrimitiveState {
  bol: boolean;
  str: string;
  num: number;
}

export const initialPrimitiveState: PrimitiveState = {
  str: 'string',
  num: 42,
  bol: true
};

export function setupState<T>(cfg: { initialState?: T }) {
  const { initialState } = { ...cfg };
  const state = new RxState<T>();
  if (initialState) {
    state.setState(initialState);
  }
  return state;
}

type ProjectStateFn<T> = (state: T) => any;

export interface StateChecker<T> {
  checkState: (service: RxState<T>, expectedState: any) => void;
  checkSubscriptions: (service: RxState<T>, expected: any) => void;
}

export function createStateChecker<T>(
  assert: (a: any, e: any) => void
): StateChecker<T> {

  return {
    checkState,
    checkSubscriptions
  };

  function checkState(service: RxState<T>, stateOrProject: object, project?: ProjectStateFn<T>): void {

    if (typeof stateOrProject === 'object' && project === undefined) {
      assert(service.getState(), stateOrProject);
      service.select(take(1)).subscribe(actual => assert(actual, stateOrProject));
      return;
    }

    if (typeof stateOrProject === 'object' && typeof project === 'function') {
      assert(project(service.getState()), stateOrProject);
      service.select(take(1))
        .subscribe(actual => assert(project(actual), stateOrProject));
      return;
    }

    throw Error('Wrong param. Should be object and optional projection function');
  }

  function checkSubscriptions(service: RxState<T>, numTotalSubs: number): void {
    const actual = (service as any).subscription._subscriptions ? (service as any).subscription._subscriptions.length : 0;
    assert(actual, numTotalSubs);
  }

}
