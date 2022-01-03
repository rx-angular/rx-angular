import {
  isDefined,
  isKeyOf,
  isObjectGuard
} from '../../src/lib/_internals/guards';

describe('isKeyOf', () => {
  it('should return true if key exists', () => {
    expect(isKeyOf<{ num: number }>('num')).toBeTruthy();
    expect(isKeyOf<{ 1: number }>(1)).toBeTruthy();
    expect(isKeyOf<{ [Symbol.iterator]: number }>(Symbol.iterator)).toBeTruthy();
  });

  it('should return false for no Promise', () => {
    expect(isKeyOf(true)).toBeFalsy();
    expect(isKeyOf([])).toBeFalsy();
    expect(isKeyOf({})).toBeFalsy();
  });
});

describe('isObjectGuard', () => {
  it('should return true for object', () => {
    expect(isObjectGuard({})).toBeTruthy();
  });

  it('should return false for primitives and arrays', () => {
    expect(isObjectGuard([])).toBeFalsy();
    expect(isObjectGuard(true)).toBeFalsy();
    expect(isObjectGuard('')).toBeFalsy();
    expect(isObjectGuard(1)).toBeFalsy();
    expect(isObjectGuard(Symbol('test'))).toBeFalsy();
    expect(isObjectGuard((a: any) => a)).toBeFalsy();
  });
});

describe('isDefined', () => {
  it('should return true for everything that is not null or undefined', () => {
    expect(isDefined(true)).toBeTruthy();
    expect(isDefined(false)).toBeTruthy();
    expect(isDefined('')).toBeTruthy();
    expect(isDefined(0)).toBeTruthy();
    expect(isDefined(Symbol('test'))).toBeTruthy();
    expect(isDefined([])).toBeTruthy();
    expect(isDefined({})).toBeTruthy();
    expect(isDefined((a: any) => a)).toBeTruthy();
  });

  it('should return false for null and undefined', () => {
    expect(isDefined(undefined)).toBeFalsy();
    expect(isDefined(null)).toBeFalsy();
  });
});
