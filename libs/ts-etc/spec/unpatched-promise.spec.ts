import { getGlobalThis, getUnpatchedResolvedPromise } from '@ngx-rx/ts-etc';

const original__zone_symbol__Promise =
  getGlobalThis().__zone_symbol__Promise || Promise;

function restoreGlobalThis() {
  getGlobalThis().__zone_symbol__Promise = original__zone_symbol__Promise;
}

describe('getUnPatchedResolvedPromise', () => {
  beforeEach(restoreGlobalThis);

  // In the tests Zone is initiated and __zone_symbol__Promise has already value
  it('should return the the native/un-patched Promise from globalThis.Promise if zone didnt patch it', () => {
    getGlobalThis().__zone_symbol__Promise = undefined;
    const originalThen: Function = Promise.prototype.then;
    let called = false;
    Promise.prototype.then = function() {
      const chained = originalThen.apply(this, arguments);
      called = true;
      return chained;
    };

    const promise = getUnpatchedResolvedPromise();
    promise.then(() => {
      expect(called).toBe(true);
    });
  });

  it('should return the the native/un-patched Promise from globalThis.__zone_symbol__Promise', () => {
    const originalThen: Function = getGlobalThis().__zone_symbol__Promise
      .prototype.then;
    let called = false;
    getGlobalThis().__zone_symbol__Promise.prototype.then = function() {
      const chained = originalThen.apply(this, arguments);
      called = true;
      return chained;
    };
    const promise = getUnpatchedResolvedPromise();
    promise.then(res => {
      expect(called).toBe(true);
    });
  });
});
