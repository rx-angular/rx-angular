import { getStrategies } from '@rx-angular/template';
import {
  getMockStrategyConfig,
  testStrategyMethod,
  CallsExpectations
} from '../../fixtures';
import { fakeAsync } from '@angular/core/testing';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';

/**
 * NOOP STRATEGY
 * Doing nothing. Should not trigger change detection
 */
const strategyName = 'noop';

const callsExpectations: CallsExpectations = {
  detectChanges: 0,
  markForCheck: 0,
  detach: 0,
  reattach: 0
};

describe('noop Strategy', () => {
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
  })

  describe('rxScheduleCD', () => {
    it('should not trigger change detection when rxScheduleCD is used with a single sync emission', (done) => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'rxScheduleCD',
        singleTime: true,
        callsExpectations
      }, done);
    });

    it('should not trigger change detection when rxScheduleCD is used with multiple sync emissions', (done) => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'rxScheduleCD',
        singleTime: false,
        callsExpectations
      }, done);
    });
  });

  describe('scheduleCD', () => {
    it('should not trigger change detection when scheduleCD is called a single time', fakeAsync(() => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'scheduleCD',
        singleTime: true,
        callsExpectations
      });
    }));

    it('should not trigger change detection when scheduleCD is called multiple times sync', fakeAsync(() => {
        testStrategyMethod({
          strategyName,
          strategyMethod: 'scheduleCD',
          singleTime: false,
          callsExpectations
        });
    }));
  })

  describe('combined scheduleCD & rxScheduleCD', () => {
    it('should not trigger change detection when scheduleCD or rxScheduleCD is called', fakeAsync(() => {
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
    }));
  })


});
