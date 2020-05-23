import {
  isIterableGuard,
  isKeyOf,
  isOperateFnArrayGuard,
  isPromiseGuard,
  isStringArrayGuard
} from '../../../src/lib/core/utils';
import { from, of } from 'rxjs';


describe('isPromiseGuard', () => {
  it('should return true for a Promise', () => {
    expect(isPromiseGuard(new Promise(() => {
    }))).toBeTruthy();
    expect(isPromiseGuard({
      then: () => {
      }
    })).toBeTruthy();
  });

  it('should return false for no Promise', () => {
    expect(isPromiseGuard(true)).toBeFalsy();
    expect(isPromiseGuard({ then: true })).toBeFalsy();
  });
});

describe('isOperateFnArrayGuard', () => {
  it('should return true for a array of functions', () => {
    expect(isOperateFnArrayGuard([() => {
    }, () => {
    }, () => {
    }])).toBeTruthy();
  });

  it('should return false for other values', () => {
    expect(isOperateFnArrayGuard(1 as any)).toBeFalsy();
    expect(isOperateFnArrayGuard([1, 2, 3])).toBeFalsy();
    expect(isOperateFnArrayGuard(['1', '2', '3'])).toBeFalsy();
    expect(isOperateFnArrayGuard('1' as any)).toBeFalsy();
    expect(isOperateFnArrayGuard(true as unknown as any[])).toBeFalsy();
    expect(isOperateFnArrayGuard([true, false, true])).toBeFalsy();
    expect(isOperateFnArrayGuard({} as any)).toBeFalsy();
    expect(isOperateFnArrayGuard([{}, {}, {}])).toBeFalsy();
    expect(isOperateFnArrayGuard([] as any)).toBeFalsy();
    expect(isOperateFnArrayGuard([[], [], []])).toBeFalsy();
    expect(isOperateFnArrayGuard([of(1), from([]), of(2)])).toBeFalsy();
    expect(isOperateFnArrayGuard(of(1) as any)).toBeFalsy();
  });
});

describe('isStringArrayGuard', () => {

  it('should return true for a array of strings', () => {
    expect(isStringArrayGuard(['1', '2', '3'])).toBeTruthy();
  });

  it('should return false for other values', () => {
    expect(isStringArrayGuard(1 as any)).toBeFalsy();
    expect(isStringArrayGuard([1, 2, 3])).toBeFalsy();
    expect(isStringArrayGuard([() => {}, () => {}, () => {}])).toBeFalsy();
    expect(isStringArrayGuard('1' as any)).toBeFalsy();
    expect(isStringArrayGuard(true as any)).toBeFalsy();
    expect(isStringArrayGuard([true, false, true])).toBeFalsy();
    expect(isStringArrayGuard({} as any)).toBeFalsy();
    expect(isStringArrayGuard([{}, {}, {}])).toBeFalsy();
    expect(isStringArrayGuard([] as any)).toBeFalsy();
    expect(isStringArrayGuard([[], [], []])).toBeFalsy();
    expect(isStringArrayGuard([of(1), from([]), of(2)])).toBeFalsy();
    expect(isStringArrayGuard(of(1) as any)).toBeFalsy();
  });
});

describe('isIterableGuard', () => {
  it('should return true for a Promise', () => {
    expect(isIterableGuard([])).toBeTruthy();
    expect(isIterableGuard({[Symbol.iterator]: () => {}})).toBeTruthy();
  });

  it('should return false for no Promise', () => {
    expect(isIterableGuard(undefined)).toBeFalsy();
    expect(isIterableGuard(null)).toBeFalsy();
    expect(isIterableGuard(true)).toBeFalsy();
    expect(isIterableGuard({ })).toBeFalsy();
  });
});

describe('isKeyOf', () => {
  it('should return true if key exists', () => {
    expect(isKeyOf<{num: number}>('num')).toBeTruthy();
    expect(isKeyOf<{1: number}>(1)).toBeTruthy();
    expect(isKeyOf<{[Symbol.iterator]: number}>(Symbol.iterator)).toBeTruthy();
  });

  it('should return false for no Promise', () => {
    expect(isKeyOf(true)).toBeFalsy();
    expect(isKeyOf([])).toBeFalsy();
    expect(isKeyOf({})).toBeFalsy();
  });
});
