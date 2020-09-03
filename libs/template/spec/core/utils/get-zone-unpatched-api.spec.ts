import { getGlobalThis, getZoneUnPatchedApi } from '../../../src/lib/core/utils';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';


describe('getZoneUnPatchedApi', () => {
  beforeAll(() => mockConsole());

  it('should execute', async () => {
    expect(getZoneUnPatchedApi('addEventListener')).toBeDefined();
  });

  it('should get unpatched Api from window', async () => {
    getGlobalThis().__zone_symbol__addEventListener = 42;
    expect(getZoneUnPatchedApi('addEventListener')).toBe(42);
    delete getGlobalThis().__zone_symbol__addEventListener;
  });

  it('should get unpatched Api from window', async () => {
    getGlobalThis().__zone_symbol__removeEventListener = 777;
    expect(getZoneUnPatchedApi('removeEventListener', getGlobalThis())).toBe(777);
    delete getGlobalThis().__zone_symbol__removeEventListener;
  });

  it('should get original Api from window', async () => {
    const elem = {
      addEventListener:  21
    };
    expect(getZoneUnPatchedApi('addEventListener', elem)).toBe(21);
  });

});
