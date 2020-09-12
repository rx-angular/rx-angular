// tslint:disable-next-line:nx-enforce-module-boundaries
import { getStrategies } from '../../../src/lib/render-strategies';
import {
  getMockStrategyConfig,
  testStrategyMethod,
  CallsExpectations
} from '../../fixtures';
import { fakeAsync } from '@angular/core/testing';

/**
 * GLOBAL STRATEGY
 * Based on markDirty.
 */

const strategyName = 'global';

const callsExpectations: CallsExpectations = {
  detectChanges: 0,
  markForCheck: 0,
  detach:0,
  reattach: 0
};

describe('global Strategy', () => {

  describe('declaration', () => {
    it('should be present in strategies map', () => {
      const strategy = getStrategies(getMockStrategyConfig())[strategyName];
      expect(strategy).toBeDefined();
    });

    it(`should have ${strategyName} as name`, () => {
      const strategy = getStrategies(getMockStrategyConfig())[strategyName];
      expect(strategy.name).toBe(strategyName);
    });
  });

  describe('rxScheduleCD', () => {
    it('should call cdRef#detectChanges & cdRef#markForCheck 0 times when rxScheduleCD is used with a single sync emission', (done) => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'rxScheduleCD',
        singleTime: true,
        callsExpectations
      }, done);
    });

    it('should call cdRef#detectChanges & cdRef#markForCheck 0 times when rxScheduleCD is used with multiple sync emissions', (done) => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'rxScheduleCD',
        singleTime: false,
        callsExpectations
      }, done);
    });
  });

  xdescribe('scheduleCD', () => {
    it('should call cdRef#detectChanges & cdRef#markForCheck 0 times when scheduleCD is called a single time', (done) => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'scheduleCD',
        flushMicrotask: true,
        singleTime: true,
        callsExpectations
      }, done);
    });

    it(`should call cdRef#detectChanges  0 times when scheduleCD is called multiple times sync`, (done) => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'scheduleCD',
        flushMicrotask: true,
        singleTime: false,
        callsExpectations
      }, done);
    });
  });

  xdescribe('combined scheduleCD & rxScheduleCD', () => {
    it('should call strategy#detectChanges 0 times when scheduleCD or rxScheduleCD is called', (done) => {
        testStrategyMethod({
          strategyName,
          strategyMethod: 'scheduleCD',
          flushMicrotask: true,
          singleTime: false,
          callsExpectations
        }, done);

        testStrategyMethod({
          strategyName,
          strategyMethod: 'rxScheduleCD',
          singleTime: false,
          callsExpectations
        }, () => {});
      })
  });

  xit(`@TODO TEST call of markDirty`, () => {
    expect(0).toBe(1);
  });

});

