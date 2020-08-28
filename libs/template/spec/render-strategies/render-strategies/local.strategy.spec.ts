// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import { getStrategies } from '@rx-angular/template';
import { getMockStrategyConfig } from '../../fixtures';
import { from, of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import createSpy = jasmine.createSpy;

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

  it('should call cdRef#detectChanges 1 time when rxScheduleCD is used with a single sync emission', (done) => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[strategyName];
    strategy.rxScheduleCD(of(1)).subscribe({
      complete: () => {
        expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(0);
        expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(1);
        done();
      }
    });
  });

  it('should call cdRef#detectChanges 1 times when rxScheduleCD is used with multiple sync emissions', (done) => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[strategyName];
    strategy.rxScheduleCD(from([0, 1, 2, 3, 4, 5])).subscribe({
      complete: () => {
        expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(0);
        expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(1);
        done();
      }
    });

  });

  it('should call cdRef#detectChanges 1 times when scheduleCD is called a single time', fakeAsync(() => {
      const cfg = getMockStrategyConfig();
      const strategy = getStrategies(cfg)[strategyName];
      strategy.scheduleCD();
      tick(100);
      expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(0);
      expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(1);
    })
  );

  it('should call cdRef#markForCheck 4 times when scheduleCD is called multiple times sync', (done) => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[strategyName];
    strategy.scheduleCD();
    strategy.scheduleCD();
    strategy.scheduleCD();
    strategy.scheduleCD();
    setTimeout(() => {
      expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(0);
      expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(4);
      done();
    });
  });

  it('should call cdRef#markForCheck 6 times when scheduleCD or rxScheduleCD is called', (done) => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[strategyName];
    strategy.detectChanges = createSpy('detectChanges');
    strategy.scheduleCD();
    strategy.rxScheduleCD(from([0, 1, 2, 3, 4, 5])).subscribe({
      complete: () => {
        expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(0);
        expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(1);
        expect(strategy.detectChanges).toHaveBeenCalledTimes(0);
        done();
      }
    });
  });

});
