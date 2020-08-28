// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import { getStrategies } from '@rx-angular/template';
import { getMockStrategyConfig } from '../../fixtures';
import { from, of } from 'rxjs';
import createSpy = jasmine.createSpy;

const noopStrategyName = 'noop';

describe('noop Strategy', () => {
  beforeAll(() => mockConsole());

  it('should be present in strategies map', () => {
    const strategy = getStrategies(getMockStrategyConfig())[noopStrategyName];
    expect(strategy).toBeDefined();
  });

  it(`should have ${noopStrategyName} as name`, () => {
    const strategy = getStrategies(getMockStrategyConfig())[noopStrategyName];
    expect(strategy.name).toBe(noopStrategyName );
  });

  it('should call cdRef#detectChanges 0 times when rxScheduleCD is used with a single sync emission', () => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[noopStrategyName];
    strategy.rxScheduleCD(of(1));
    expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(0)
    expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(0)
  });

  it('should call cdRef#detectChanges 0 times when rxScheduleCD is used with multiple sync emissions', () => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[noopStrategyName];
    strategy.rxScheduleCD(from([0,1,2,3,4,5]));
    expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(0)
    expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(0)
  });

  it('should call cdRef#detectChanges 0 times when scheduleCD is called a single time', () => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[noopStrategyName];
    strategy.scheduleCD();
    expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(0)
    expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(0)
  });

  it('should call cdRef#detectChanges 0 times when scheduleCD is called multiple times sync', () => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[noopStrategyName];
    strategy.scheduleCD();
    strategy.scheduleCD();
    strategy.scheduleCD();
    strategy.scheduleCD();
    expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(0)
    expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(0)
  });

  it('should call strategy#detectChanges 0 times when scheduleCD or rxScheduleCD is called', () => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[noopStrategyName];
    strategy.rxScheduleCD(from([0,1,2,3,4,5]));
    strategy.detectChanges = createSpy('detectChanges')
    strategy.scheduleCD();
    expect(strategy.detectChanges).toHaveBeenCalledTimes(0)
  });

});
