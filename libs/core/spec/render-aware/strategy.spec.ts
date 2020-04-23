import {
  createNativeStrategy,
  createNoopStrategy,
  DEFAULT_STRATEGY_NAME,
  getStrategies,
  getZoneUnPatchedPromiseDurationSelector
} from '../../src';
import { getMockNativeStrategyConfig } from '../fixtures/fixtures';
import { TestScheduler } from 'rxjs/testing';
import { jestMatcher } from '@test-helpers';
import { getGlobalThis } from '../../src';

let testScheduler: TestScheduler;

// In THIS test setup Zone is initiated and __zone_symbol__Promise has already value
const original__zone_symbol__Promise =
  getGlobalThis().__zone_symbol__Promise || Promise;
function restoreGlobalThis() {
  getGlobalThis().__zone_symbol__Promise = original__zone_symbol__Promise;
}

describe('getZoneUnPatchedPromiseDurationSelector', () => {
  beforeEach(restoreGlobalThis);

  it('should return the the native/un-patched Promise from globalThis.Promise if zone didnt patch it', () => {
    getGlobalThis().__zone_symbol__Promise = undefined;
    const originalThen: Function = Promise.prototype.then;
    let called = false;
    Promise.prototype.then = function() {
      const chained = originalThen.apply(this, arguments);
      called = true;
      return chained;
    };

    const promise = getZoneUnPatchedPromiseDurationSelector();
    promise().subscribe(() => {
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
    const promise = getZoneUnPatchedPromiseDurationSelector();
    promise().subscribe(res => {
      expect(called).toBe(true);
    });
  });
});

describe('DEFAULT_STRATEGY_NAME', () => {
  it('should be `native`', () => {
    const strategies = getStrategies(getMockNativeStrategyConfig());
    expect(strategies[DEFAULT_STRATEGY_NAME].name).toBe('native');
  });
});

describe('strategies', () => {
  beforeEach(() => {
    testScheduler = new TestScheduler(jestMatcher);
  });

  describe('createNativeStrategy', () => {
    it('should return a strategy named `native`', () => {
      const strategy = createNativeStrategy(getMockNativeStrategyConfig());
      expect(strategy.name).toBe('native');
    });

    it('should call the renderMethod `ChangeDetectorRef#markForCheck`', () => {
      const cfg = getMockNativeStrategyConfig();
      const strategy = createNativeStrategy(cfg);
      strategy.render();
      expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(1);
    });

    it('should have a "noop" behavior', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const cfg = getMockNativeStrategyConfig();
        const strategy = createNativeStrategy(cfg);

        const source$ = cold('abcde|');
        const expexted = 'abcde|';
        const result$ = source$.pipe(strategy.behaviour());
        expectObservable(result$).toBe(expexted);
      });
    });
  });

  describe('createNoopStrategy', () => {
    it('should return a strategy named `noop`', () => {
      const strategy = createNoopStrategy();
      expect(strategy.name).toBe('noop');
    });

    it('should have a "noop" behavior', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const strategy = createNoopStrategy();

        const source$ = cold('abcde|');
        const expexted = 'abcde|';
        const result$ = source$.pipe(strategy.behaviour());
        expectObservable(result$).toBe(expexted);
      });
    });
  });
});
