import { getGlobalThis } from '../../../src/lib/core';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import { isViewEngineIvy } from '@rx-angular/template';


describe('isIvy', () => {
  beforeAll(() => mockConsole());
  afterEach(() => {
    delete getGlobalThis().ng;
  });

  describe('in ViewEngine Angular 8 + 9', () => {
    it('should return false if ng is defined with probe', () => {
      getGlobalThis().ng = { probe: true };
      expect(isViewEngineIvy()).toBe(false);
    });
  });
  describe('in Ivy Angular 9', () => {
    it('should return true if ng is undefined', () => {
      getGlobalThis().ng = undefined;
      expect(isViewEngineIvy()).toBe(true);
    });

    it('should return true if ng.probe is set', () => {
      getGlobalThis().ng = { probe: undefined };
      expect(isViewEngineIvy()).toBe(true);
    });
  });
});
