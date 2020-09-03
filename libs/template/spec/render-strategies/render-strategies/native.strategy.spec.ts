// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import { getStrategies } from '../../../src/lib/render-strategies';
import { CallsExpectations, getMockStrategyConfig, numMultipleCalls, testStrategyMethod } from '../../fixtures';

/**
 * NATIVE STRATEGY
 * Doing the same thing as Angular natively. Based on markForCheck.
 */

const strategyName = 'native';

const callsExpectations: CallsExpectations = {
  detectChanges: 0,
  markForCheck: 1,
  detach: 0,
  reattach: 0
};

describe('native Strategy', () => {
  beforeAll(() => mockConsole());

  describe('declaration', () => {
    it('should be present in strategies map', () => {
      const strategy = getStrategies(getMockStrategyConfig())[strategyName];
      expect(strategy).toBeDefined();
    });

    it(`should have ${ strategyName } as name`, () => {
      const strategy = getStrategies(getMockStrategyConfig())[strategyName];
      expect(strategy.name).toBe(strategyName);
    });
  });

  describe('rxScheduleCD', () => {
    it(`should call cdRef#markForCheck 1 times when rxScheduleCD is used with a single sync emission`, (done) => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'rxScheduleCD',
        singleTime: true,
        callsExpectations
      }, done);
    });

    it(
      `should call cdRef#markForCheck ${ numMultipleCalls } times when rxScheduleCD is used with multiple sync emissions`,
      (done) => {
        testStrategyMethod({
          strategyName,
          strategyMethod: 'rxScheduleCD',
          singleTime: false,
          callsExpectations: { ...callsExpectations, markForCheck: numMultipleCalls }
        }, done);
      }
    );
  });

  describe('scheduleCD', () => {
    it(`should call cdRef#markForCheck 1 times when scheduleCD is called a single time`, done => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'scheduleCD',
        singleTime: true,
        callsExpectations
      }, done);
    });

    it(
      `should call cdRef#markForCheck ${ numMultipleCalls } times when scheduleCD is called multiple times sync`,
      done => {
        testStrategyMethod({
          strategyName,
          strategyMethod: 'scheduleCD',
          singleTime: false,
          callsExpectations: { ...callsExpectations, markForCheck: numMultipleCalls }
        }, done);
      }
    );
  });

  describe('combined scheduleCD & rxScheduleCD', () => {
    it(
      `should call strategy#markForCheck ${ numMultipleCalls } times when scheduleCD or rxScheduleCD is called`,
      done => {
        testStrategyMethod({
          strategyName,
          strategyMethod: 'scheduleCD',
          singleTime: false,
          callsExpectations: { ...callsExpectations, markForCheck: numMultipleCalls }
        }, () => {});

        testStrategyMethod({
          strategyName,
          strategyMethod: 'rxScheduleCD',
          singleTime: false,
          callsExpectations: { ...callsExpectations, markForCheck: numMultipleCalls }
        }, done);
      }
    );
  });

});
