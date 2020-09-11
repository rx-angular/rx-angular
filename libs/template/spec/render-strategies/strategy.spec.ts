import { from } from 'rxjs';
import {
  getGlobalThis, getUnpatchedResolvedPromise
} from '../../src/lib/core';
import {
  getStrategies
} from '../../src/lib/render-strategies';
import { TestScheduler } from 'rxjs/testing';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { jestMatcher, mockConsole } from '@test-helpers';

import {
  getMockStrategyConfig
} from '../fixtures';
import { DEFAULT_STRATEGY_NAME } from '../../src/lib/render-strategies/strategies/strategies-map';
import { createNativeStrategy } from '../../src/lib/render-strategies/strategies/native.strategy';
import { createNoopStrategy } from '../../src/lib/render-strategies/strategies/noop.strategy';

const t = { foo: true, bar: 'test', baz: [] };

updateProp(t, 'foo', false);

function updateProp<T, K extends keyof T>(o: T, k: K, v: T[K]): T {
  o[k] = v;
  return o;
}

let testScheduler: TestScheduler;

// In THIS test setup Zone is initiated and __zone_symbol__Promise has already value
const original__zone_symbol__Promise =
  getGlobalThis().__zone_symbol__Promise || Promise;
function restoreGlobalThis() {
  getGlobalThis().__zone_symbol__Promise = original__zone_symbol__Promise;
}

function tickFromUnPatchedPromise() {
  return from(getUnpatchedResolvedPromise());
}


describe('getZoneUnPatchedDurationSelector', () => {
  beforeAll(() => mockConsole());

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

    const promiseTick$ = tickFromUnPatchedPromise();
    promiseTick$.subscribe(() => {
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
    const promiseTick$ = tickFromUnPatchedPromise();
    promiseTick$.subscribe(res => {
      expect(called).toBe(true);
    });
  });
});

describe('DEFAULT_STRATEGY_NAME', () => {
  it('should be `native`', () => {
    const strategies = getStrategies(getMockStrategyConfig());
    expect(strategies[DEFAULT_STRATEGY_NAME].name).toBe('local');
  });
});

describe('strategies', () => {
  beforeEach(() => {
    testScheduler = new TestScheduler(jestMatcher);
  });

  describe('createNativeStrategy', () => {
    it('should return a strategy named `native`', () => {
      const strategy = createNativeStrategy(getMockStrategyConfig());
      expect(strategy.name).toBe('native');
    });

    it('should call the renderMethod `ChangeDetectorRef#markForCheck`', () => {
      const cfg = getMockStrategyConfig();
      const strategy = createNativeStrategy(cfg);
      strategy.detectChanges();
      expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(1);
    });
  });

  describe('createNoopStrategy', () => {
    it('should return a strategy named `noop`', () => {
      const strategy = createNoopStrategy(getMockStrategyConfig());
      expect(strategy.name).toBe('noop');
    });
  });
});
