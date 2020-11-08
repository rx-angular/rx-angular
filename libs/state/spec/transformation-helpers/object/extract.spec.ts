import { initialPrimitiveState, PrimitiveState } from '../../fixtures';
import { extract } from '@rx-angular/state';

let primitiveState: PrimitiveState;

beforeEach(() => {
  primitiveState = initialPrimitiveState;
  jest.spyOn(console, 'warn').mockImplementation(() => {
  });
});


describe('extract', () => {

  describe('general', () => {
    it('should be defined', () => {
      const fn = extract;
      expect(fn).toBeDefined();
    });

    it('should not mutate object', () => {
      const simpleState = { ...primitiveState };
      extract(simpleState, 'bol');

      expect(simpleState).toEqual(primitiveState);
    });

    it('should not return same reference', () => {
      const simpleState = { ...primitiveState };
      const result = extract(simpleState, 'num');
      const result2 = extract(simpleState, null as any);

      simpleState.bol = false;

      expect(simpleState).toEqual({ num: 42, bol: false, str: 'str' });
      expect(result).toEqual({ num: 42 });
      expect(result2).toEqual(undefined);
    });
  });

  describe('functionality', () => {
    it('should extract single key', () => {
      const result = extract(primitiveState, 'str');

      expect(result).toEqual({ str: 'str' });
    });

    it('should extract array of keys', () => {
      const result = extract(primitiveState, ['bol', 'num']);

      expect(result).toEqual({ bol: true, num: 42 });
    });

    it('should extract only existing keys', () => {
      const result = extract(primitiveState, ['bol', 'num', 'obj'] as any);

      expect(result).toEqual({ bol: true, num: 42 });
    });
  });

  describe('edge cases', () => {
    it('should return object with provided property if first argument is not an object', () => {
      expect(extract('' as any, 'fake' as any)).toEqual(undefined);
      expect(extract(null as any, 'fake')).toEqual(undefined);
      expect(extract(undefined as any, 'fake')).toEqual(undefined);
      expect(extract(null as any, null as any)).toEqual(undefined);
      expect(extract([primitiveState], 'concat')).toEqual(undefined);
      expect(extract(primitiveState, 'concat' as any)).toEqual(undefined);
      expect(extract(primitiveState, {} as any)).toEqual(undefined);
      expect(extract(primitiveState, [] as any)).toEqual(undefined);
      expect(extract(primitiveState, 1 as any)).toEqual(undefined);
      expect(extract(primitiveState, null as any)).toEqual(undefined);
      expect(extract(primitiveState, undefined as any)).toEqual(undefined);
      expect(extract(primitiveState, (() => null) as any)).toEqual(undefined);
      expect(extract(primitiveState, ['nonExisting', 1] as any)).toEqual(undefined);
    });
  });
});
