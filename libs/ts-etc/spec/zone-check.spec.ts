import { apiZonePatched, envZonePatched, getGlobalThis, isNgZone, isNoopNgZone } from '../src';
import { manualInstanceNgZone, manualInstanceNoopNgZone, mockPromise } from './fixtures/fixtures.spec';

describe('envZonePatched', () => {
  it('should return true if `zone.js` did patch the global API', () => {
    getGlobalThis().Zone = manualInstanceNgZone;
    expect(envZonePatched()).toBe(true);
  });

  it('should return false if `zone.js` did not patch the global API', () => {
    getGlobalThis().Zone = undefined;
    expect(envZonePatched()).toBe(false);
  });
});

describe('apiZonePatched', () => {
  it('should return true if `zone.js` did patch the Promise API', () => {
    getGlobalThis().__zone_symbol__Promise = mockPromise;
    expect(apiZonePatched('Promise')).toBe(true);
  });

  it('should return false if `zone.js` did not patch the Promise API', () => {
    getGlobalThis().__zone_symbol__Promise = undefined;
    expect(apiZonePatched('Promise')).toBe(false);
  });
});

describe('isNgZone', () => {
  it('should return true if the passed instance is `NgZone`', () => {
    const ngZone = manualInstanceNgZone;
    expect(isNgZone(ngZone)).toBe(true);
  });

  it('should return true if the passed instance is not `NgZone`', () => {
    const notNgZone = manualInstanceNoopNgZone;
    expect(isNgZone(notNgZone)).toBe(false);
  });
});

describe('isNoopNgZone', () => {
  it('should return true if the passed instance is `NoopNgZone`', () => {
    const noopNgZone = manualInstanceNoopNgZone;
    expect(isNoopNgZone(noopNgZone)).toBe(true);
  });

  it('should return true if the passed instance is not `NoopNgZone`', () => {
    const notNoopNgZone = manualInstanceNgZone;
    expect(isNoopNgZone(notNoopNgZone)).toBe(false);
  });
});

