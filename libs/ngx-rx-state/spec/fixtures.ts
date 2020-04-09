import { RxLocalState } from '@ngx-rx/ngx-rx-state';
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

export function setupState<T extends object>(cfg: { initialState?: T }) {
  const { initialState } = { ...cfg };
  const state = new RxLocalState<T>();
  if (initialState) {
    state.setState(initialState);
  }
  return state;
}

type ProjectStateFn<T> = (state: T) => any;

export interface StateChecker<T extends object> {
  checkState: (service: RxLocalState<T>, expectedState: any) => void;
  checkSubscriptions: (service: RxLocalState<T>, expected: any) => void;
}

export function createStateChecker<T extends object>(
  assert: (a: any, e: any) => void
): StateChecker<T> {

  return {
    checkState,
    checkSubscriptions
  };

  function checkState(service: RxLocalState<T>, stateOrProject: object, project?: ProjectStateFn<T>): void {

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

  function checkSubscriptions(service: RxLocalState<T>, numTotalSubs: number): void {
    const actual = (service as any).subscription._subscriptions ? (service as any).subscription._subscriptions.length : 0;
    assert(actual, numTotalSubs);
  }

}
