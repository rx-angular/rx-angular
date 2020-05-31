import { isNgZone } from '../../../src/lib/core/utils';

describe('envZonePatched', () => {
  it('should return true if `zone.js` did patch the global API', () => {
    expect(isNgZone({ runOutsideAngular (fn) { fn.apply(null) } })).toBe(true);
  });

  it('should return false if `zone.js` did not patch the global API', () => {
    expect(isNgZone({ runOutsideAngular (fn) { fn() } })).toBe(false);
  });
});
