// tslint:disable-next-line:nx-enforce-module-boundaries
import { getStrategies } from '@rx-angular/template';
import {
  getMockStrategyConfig,
  multipleCalls,
  oneCall,
  runStrategyMethod,
  testRxScheduleCDMethod
} from '../../fixtures';
import { fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';

/**
 * LOCAL STRATEGY
 * Coalescing on component scope. Based on detectChange.
 */

const strategyName = 'local';

describe('local Strategy', () => {
  // beforeAll(() => mockConsole());

  it('should be present in strategies map', () => {
    const strategy = getStrategies(getMockStrategyConfig())[strategyName];
    expect(strategy).toBeDefined();
  });

  it(`should have ${strategyName} as name`, () => {
    const strategy = getStrategies(getMockStrategyConfig())[strategyName];
    expect(strategy.name).toBe(strategyName);
  });

  it('should call cdRef#detectChanges 1 times when rxScheduleCD is used with a single sync emission', (done) => {
    testRxScheduleCDMethod(done)('detectChanges', strategyName, oneCall, 1);
  });

  it(`should call cdRef#markForCheck 0 times when rxScheduleCD is used with a single sync emission`, (done) => {
    testRxScheduleCDMethod(done)('markForCheck', strategyName, oneCall, 0);
  });

  it('should call cdRef#detectChanges 1 times when rxScheduleCD is used with multiple sync emissions', (done) => {
    testRxScheduleCDMethod(done)('detectChanges', strategyName, multipleCalls, 1);
  });

  it(`should call cdRef#markForCheck 0 times when rxScheduleCD is used with multiple sync emissions`, (done) => {
    testRxScheduleCDMethod(done)('markForCheck', strategyName, multipleCalls, 0);
  });

  it('should call cdRef#detectChanges 1 times when scheduleCD is called a single time', fakeAsync(() => {
    const method = 'detectChanges';
    const cfg = runStrategyMethod()({
      strategyMethodName: 'scheduleCD',
      strategyName,
      singleCall: oneCall
    });
    tick(100);
    flushMicrotasks();
    expect(cfg.cdRef[method]).toHaveBeenCalledTimes(1);
  }));

  it(`should call cdRef#markForCheck 0 times when scheduleCD is called a single time`, fakeAsync(() => {
    const method = 'markForCheck';
    const cfg = runStrategyMethod()({
      strategyMethodName: 'scheduleCD',
      strategyName,
      singleCall: oneCall
    });
    tick(100);
    expect(cfg.cdRef[method]).toHaveBeenCalledTimes(0);
  }));

  it(`should call cdRef#detectChanges 1 times when scheduleCD is called multiple times sync`, fakeAsync(() => {
      const method = 'detectChanges';
      const cfg = runStrategyMethod()({
        strategyMethodName: 'scheduleCD',
        strategyName,
        singleCall: multipleCalls
      });
      tick(100);
      expect(cfg.cdRef[method]).toHaveBeenCalledTimes(1);
    })
  );

  it(`should call cdRef#markForCheck 0 times when scheduleCD is called multiple times sync`, fakeAsync(() => {
      const method = 'markForCheck';
      const cfg = runStrategyMethod()({ strategyMethodName: 'scheduleCD',
      strategyName,
      singleCall: multipleCalls});
      tick(100);
      expect(cfg.cdRef[method]).toHaveBeenCalledTimes(0);
    })
  );

  it('should call strategy#detectChanges 1 times when scheduleCD or rxScheduleCD is called', fakeAsync(() => {
      const method = 'detectChanges';
      const cfg = runStrategyMethod()({
        strategyMethodName: 'scheduleCD',
        strategyName,
        singleCall: multipleCalls
      });
      tick(100);
      expect(cfg.cdRef[method]).toHaveBeenCalledTimes(1);
      testRxScheduleCDMethod(() => {
      })(method, strategyName, multipleCalls, 1);
    })
  );

  it(`should call strategy#markForCheck 0 times when scheduleCD or rxScheduleCD is called`, fakeAsync((done) => {
      const method = 'markForCheck';
      const cfg = runStrategyMethod()({
        strategyMethodName: 'scheduleCD',
        strategyName,
        singleCall: multipleCalls
      });
      tick(100);
      expect(cfg.cdRef[method]).toHaveBeenCalledTimes(0);
      testRxScheduleCDMethod(() => {})(method, strategyName, multipleCalls, 0);
    })
  );

});
