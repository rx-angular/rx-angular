import { RxState } from '@rxjs-state';
import { TestScheduler } from 'rxjs/testing';
import { jestMatcher } from '@test-helpers';

interface PrimitiveState {
  bol: boolean;
  str: string;
  num: number;
}

interface NestedState {
  obj: {
    key1: {
      key11: {
        key111: string;
      }
    }
  }
}

const initialPrimitiveState: PrimitiveState = {
  str: 'string',
  num: 42,
  bol: true
};

function setupState<T extends object>(cfg: { initialState?: T, initialize?: boolean }) {
  const { initialState, initialize } = { initialize: true, ...cfg };
  const state = new RxState<T>();
  if (initialize) {
    state.subscribe();
  }
  if (initialState) {
    state.setState(initialState);
  }
  return state;
}


let testScheduler: TestScheduler;

beforeEach(() => {
  testScheduler = new TestScheduler(jestMatcher);
});

// tslint:disable: no-duplicate-string
describe('State', () => {
  it('should create new instance', () => {
    const state = new RxState<PrimitiveState>();
    expect(state).toBeDefined();
  });

  describe('select', () => {
    it('should return nothing without subscriber', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = setupState({ initialState: initialPrimitiveState, initialize: false });
        expectObservable(state.select()).toBe('');
      });
    });
  });

  it('should return initial state', () => {
    testScheduler.run(({ expectObservable }) => {
      const state = setupState({ initialState: initialPrimitiveState });
      expectObservable(state.select()).toBe('s', { s: initialPrimitiveState });
    });
  });

  describe('slice by key', () => {
    it('should return empty state after init', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = setupState({});
        expectObservable(state.select()).toBe('');
      });
    });

    it(
      'should return initial state', () => {
        testScheduler.run(({ expectObservable }) => {
          const state = new RxState<PrimitiveState>();
          state.subscribe();

          state.setState({ num: 42 });
          expectObservable(state.select('num')).toBe('s', { s: 42 });
        });
      });
  });

  describe('slice by map function', () => {
    it('should return nothing if empty', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = setupState({});
        expectObservable(state.select()).toBe('');
      });
    });

    it('should return full state object on select', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = setupState({ initialState: initialPrimitiveState });
        expectObservable(state.select()).toBe('s', { s: initialPrimitiveState });
      });
    });
  });
});

describe('setState', () => {
  describe('with state partial', () => {
    it('should add new slices', () => {
      const state = setupState({});
      state.select().subscribe(s => {
        throw Error('should never emit');
      });
      state.setState(initialPrimitiveState);
      state.select().subscribe(s => expect(s).toBe(initialPrimitiveState));
    });
    it('should override previous state slices', () => {
      const state = setupState({ initialState: initialPrimitiveState });
      state.select().subscribe(s => {
        throw Error('should never emit');
      });
      state.setState(initialPrimitiveState);
      state.select().subscribe(s => expect(s).toBe(initialPrimitiveState));
      state.setState({ num: 1 });
      state.select().subscribe(s => expect(s).toBe({ num: 1 }));
    });
  });
  describe('with state project partial', () => {
    it('should add new slices', () => {
      const state = setupState({});
      state.select().subscribe(s => {
        throw Error('should never emit');
      });
      state.setState((s) => initialPrimitiveState);
      state.select().subscribe(s => expect(s).toBe(initialPrimitiveState));
    });
    it('should override previous state slices', () => {
      const state = setupState({ initialState: initialPrimitiveState });
      state.select().subscribe(s => expect(state).toBe(initialPrimitiveState));
      state.setState(s => ({ num: s.num + 1 }));
      state.select().subscribe(s => expect(state).toBe({ num: 43 }));
    });
  });
  describe('with state key and value partial', () => {
    it('should add new slices', () => {
      const state = setupState<PrimitiveState>({});
      state.select().subscribe(s => {
       // throw Error('should never emit');
      });
      state.setState('num', (s) => 1);
      state.select().subscribe(s => expect(s).toBe(initialPrimitiveState));
    });
    it('should override previous state slices', () => {
      const state = setupState({ initialState: initialPrimitiveState });
      state.select().subscribe(s => expect(s).toBe(initialPrimitiveState));
      state.setState('num', (s) => s.num + 1);
      state.select().subscribe(s => expect(s).toBe({ num: 43 }));
    });
  });
});

describe('connectState', () => {
  describe('with observable of slices', () => {
    it('should add new slices', () => {
    });

    it('should override previous state slices', () => {
    });

  });
});
