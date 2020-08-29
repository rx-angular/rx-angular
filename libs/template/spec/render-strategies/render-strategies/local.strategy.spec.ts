// tslint:disable-next-line:nx-enforce-module-boundaries
import { getStrategies } from '@rx-angular/template';
import {
  getMockStrategyConfig,
  multipleCalls,
  oneCall,
  testStrategyMethod,
  CallsExpectations
} from '../../fixtures';
import { fakeAsync } from '@angular/core/testing';
import { mockConsole } from '@test-helpers';

/**
 * LOCAL STRATEGY
 * Coalescing on component scope. Based on detectChange.
 */

const strategyName = 'local';

const callsExpectations: CallsExpectations = {
  detectChanges: 1,
  markForCheck: 0,
  detach: 0,
  reattach: 0
};

describe('local Strategy', () => {
  beforeAll(() => mockConsole());

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
    it('should call cdRef#detectChanges 1 times when rxScheduleCD is used with a single sync emission', (done) => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'rxScheduleCD',
        singleTime: true,
        callsExpectations
      }, done);
    });

    it('should call cdRef#detectChanges 1 times when rxScheduleCD is used with multiple sync emissions', (done) => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'rxScheduleCD',
        singleTime: true,
        callsExpectations
      }, done);
    });
  });

  describe('scheduleCD', () => {
    it('should call cdRef#detectChanges 1 times when scheduleCD is called a single time', fakeAsync(() => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'scheduleCD',
        flushMicrotask: true,
        singleTime: true,
        callsExpectations
      });
    }));

    it(`should call cdRef#detectChanges 1 times when scheduleCD is called multiple times sync`, fakeAsync(() => {
      // This test currently fails
        testStrategyMethod({
          strategyName,
          strategyMethod: 'scheduleCD',
          singleTime: false,
          callsExpectations
        });
      })
    );
  })

  describe('combined scheduleCD & rxScheduleCD', () => {
    it('should call strategy#detectChanges 1 times when scheduleCD or rxScheduleCD is called', fakeAsync(() => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'scheduleCD',
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
  })
});
