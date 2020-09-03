import { getGlobalThis, getZoneUnPatchedApi } from '../../../src/lib/core/utils';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';


describe('getZoneUnPatchedApi', () => {
  beforeAll(() => mockConsole());

  it('should execute', async () => {
    expect(getZoneUnPatchedApi('addEventListener')).toBeDefined();
  });

  it('should get unpatched Api from window', async () => {
    getGlobalThis().__zone_symbol__addEventListener = 'addEventListener';
    expect(getZoneUnPatchedApi('addEventListener')).toBe('addEventListener');
    delete getGlobalThis().__zone_symbol__addEventListener;
  });

  it('should get unpatched Api from window', async () => {
    getGlobalThis().__zone_symbol__removeEventListener = 'removeEventListener';
    expect(getZoneUnPatchedApi('removeEventListener', getGlobalThis())).toBe('removeEventListener');
    delete getGlobalThis().__zone_symbol__removeEventListener;
  });

  it('should get original Api from element', async () => {
    const elem = {
      addEventListener:  'elem-addEventListener'
    };
    expect(getZoneUnPatchedApi('addEventListener', elem)).toBe('elem-addEventListener');
  });


  it('should get unpatched Api from element', async () => {
    const elem = {
      addEventListener:  'elem-addEventListener',
      __zone_symbol__addEventListener:  'elem-__zone_symbol__addEventListener',
    };
    expect(getZoneUnPatchedApi('addEventListener', elem)).toBe('elem-__zone_symbol__addEventListener');
  });

});
