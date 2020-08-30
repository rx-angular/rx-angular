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
  // beforeAll(() => mockConsole());

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

  describe('scheduleCD', () => {
    it('should call cdRef#detectChanges & cdRef#markForCheck 0 times when scheduleCD is called a single time', fakeAsync(() => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'scheduleCD',
        flushMicrotask: true,
        singleTime: true,
        callsExpectations
      });
    }));

    it(`should call cdRef#detectChanges  0 times when scheduleCD is called multiple times sync`, fakeAsync(() => {
        testStrategyMethod({
          strategyName,
          strategyMethod: 'scheduleCD',
          flushMicrotask: true,
          singleTime: false,
          callsExpectations
        });
      })
    );
  });

  describe('combined scheduleCD & rxScheduleCD', () => {
    it('should call strategy#detectChanges 0 times when scheduleCD or rxScheduleCD is called', fakeAsync(() => {
        testStrategyMethod({
          strategyName,
          strategyMethod: 'scheduleCD',
          flushMicrotask: true,
          singleTime: false,
          callsExpectations
        });

        testStrategyMethod({
          strategyName,
          strategyMethod: 'rxScheduleCD',
          singleTime: false,
          callsExpectations
        }, () => {});
      })
    );
  });



  it(`@TODO TEST call of markDirty`, () => {
    expect(0).toBe(1);
  });

});
