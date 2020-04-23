import {
  apiZonePatched,
  envZonePatched,
  getGlobalThis,
  isNgZone,
  isNoopNgZone
} from '../../src';
import {
  manualInstanceNgZone,
  manualInstanceNoopNgZone,
  mockPromise
} from '../fixtures/fixtures';
import { mutationManagerFactory } from '@test-helpers';

const mutationManager = mutationManagerFactory(getGlobalThis(), {
  Zone: manualInstanceNgZone,
  __zone_symbol__Promise: mockPromise
});

describe('envZonePatched', () => {
  beforeEach(() => {
    mutationManager.restore();
  });

  it('should return true if `zone.js` did patch the global API', () => {
    mutationManager.set('Zone', manualInstanceNgZone);
    expect(envZonePatched()).toBe(true);
  });

  it('should return false if `zone.js` did not patch the global API', () => {
    mutationManager.set('Zone', undefined);
    expect(envZonePatched()).toBe(false);
    mutationManager.restore();
  });
});

describe('apiZonePatched', () => {
  beforeEach(() => {
    mutationManager.restore();
  });

  it('should return true if `zone.js` did patch the Promise API', () => {
    mutationManager.set('__zone_symbol__Promise', mockPromise);
    expect(apiZonePatched('Promise')).toBe(true);
  });

  it('should return false if `zone.js` did not patch the Promise API', () => {
    mutationManager.set('__zone_symbol__Promise', undefined);
    expect(apiZonePatched('Promise')).toBe(false);
    mutationManager.restore();
  });
});

describe('isNgZone', () => {
  beforeEach(() => {
    mutationManager.restore();
  });

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
