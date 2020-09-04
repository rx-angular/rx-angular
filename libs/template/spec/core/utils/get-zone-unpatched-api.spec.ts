import { getGlobalThis, getZoneUnPatchedApi } from '../../../src/lib/core/utils';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';

let originalWinRemoveEventListener;
let originalWinAddEventListener;
let originalZoneSymboWinAddEventListener;

describe('getZoneUnPatchedApi', () => {
  beforeAll(() => {
    mockConsole();
    originalWinRemoveEventListener = getGlobalThis()['win-removeEventListener'];
    originalWinAddEventListener = getGlobalThis()['win-addEventListener'];
    originalZoneSymboWinAddEventListener = getGlobalThis()['__zone_symbol__win-addEventListener'];
  });
  afterEach(() => {
    getGlobalThis()['win-removeEventListener'] = originalWinRemoveEventListener;
    getGlobalThis()['win-addEventListener'] = originalWinAddEventListener;
    getGlobalThis()['__zone_symbol__win-addEventListener'] = originalZoneSymboWinAddEventListener;
  });

  it('should execute', async () => {
    expect(getZoneUnPatchedApi('addEventListener')).toBeDefined();
  });

  it('should get original Api from window', async () => {
    getGlobalThis()['win-removeEventListener'] = 'win-removeEventListener';
     expect(getZoneUnPatchedApi('win-removeEventListener')).toBe('win-removeEventListener');
  });

  it('should get unpatched Api from window', async () => {
    getGlobalThis()['win-addEventListener'] = 'win-addEventListener';
    getGlobalThis()['__zone_symbol__win-addEventListener'] = '__zone_symbol__win-addEventListener'
    expect(getZoneUnPatchedApi('win-addEventListener')).toBe('__zone_symbol__win-addEventListener');
  });

  it('should get original Api from element', async () => {
    const elem = {
      'elem-removeEventListener': 'elem-removeEventListener',
    };
    expect(getZoneUnPatchedApi('elem-removeEventListener', elem)).toBe('elem-removeEventListener');
  });

  it('should get unpatched Api from element', async () => {
    const elem = {
      'elem-addEventListener': 'elem-addEventListener',
      '__zone_symbol__elem-addEventListener': '__zone_symbol__elem-addEventListener'
    };
    expect(getZoneUnPatchedApi('elem-addEventListener', elem)).toBe(elem['__zone_symbol__elem-addEventListener']);
  });

});
