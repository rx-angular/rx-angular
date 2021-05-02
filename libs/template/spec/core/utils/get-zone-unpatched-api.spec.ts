import { ɵglobal } from '@angular/core';
import { getZoneUnPatchedApi } from '../../../src/lib/core/utils';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';

let originalWinRemoveEventListener;
let originalWinAddEventListener;
let originalZoneSymboWinAddEventListener;

describe('getZoneUnPatchedApi', () => {
  beforeAll(() => {
    mockConsole();
    originalWinRemoveEventListener = ɵglobal['win-removeEventListener'];
    originalWinAddEventListener = ɵglobal['win-addEventListener'];
    originalZoneSymboWinAddEventListener = ɵglobal['__zone_symbol__win-addEventListener'];
  });
  afterEach(() => {
    ɵglobal['win-removeEventListener'] = originalWinRemoveEventListener;
    ɵglobal['win-addEventListener'] = originalWinAddEventListener;
    ɵglobal['__zone_symbol__win-addEventListener'] = originalZoneSymboWinAddEventListener;
  });

  it('should execute', async () => {
    expect(getZoneUnPatchedApi('addEventListener')).toBeDefined();
  });

  it('should get original Api from window', async () => {
    ɵglobal['win-removeEventListener'] = 'win-removeEventListener';
    expect(getZoneUnPatchedApi('win-removeEventListener')).toBe('win-removeEventListener');
  });

  it('should get unpatched Api from window', async () => {
    ɵglobal['win-addEventListener'] = 'win-addEventListener';
    ɵglobal['__zone_symbol__win-addEventListener'] = '__zone_symbol__win-addEventListener';
    expect(getZoneUnPatchedApi('win-addEventListener')).toBe('__zone_symbol__win-addEventListener');
  });

  it('should get original Api from element', async () => {
    const elem = {
      'elem-removeEventListener': 'elem-removeEventListener'
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
