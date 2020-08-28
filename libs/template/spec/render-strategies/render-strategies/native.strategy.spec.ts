// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import { getStrategies } from '@rx-angular/template';
import { getMockStrategyConfig } from '../../fixtures';
import { from, of } from 'rxjs';
import createSpy = jasmine.createSpy;

const nativeStrategyName = 'native';

describe('native Strategy', () => {
  beforeAll(() => mockConsole());

  it('should be present in strategies map', () => {
    const strategy = getStrategies(getMockStrategyConfig())[nativeStrategyName];
    expect(strategy).toBeDefined();
  });

  it(`should have ${nativeStrategyName} as name`, () => {
    const strategy = getStrategies(getMockStrategyConfig())[nativeStrategyName];
    expect(strategy.name).toBe(nativeStrategyName );
  });

  it('should call cdRef#markForCheck 1 time when rxScheduleCD is used with a single sync emission', (done) => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[nativeStrategyName];
    strategy.rxScheduleCD(of(1)).subscribe({
      complete: () => {
        expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(1);
        expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(0);
        done()
      }
    });
  });

  it('should call cdRef#markForCheck 6 times when rxScheduleCD is used with multiple sync emissions', (done) => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[nativeStrategyName];
    strategy.rxScheduleCD(from([0,1,2,3,4,5])).subscribe({
      complete: () => {
        expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(6);
        expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(0);
        done()
      }
    });

  });

  it('should call cdRef#markForCheck 1 times when scheduleCD is called a single time', () => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[nativeStrategyName];
    strategy.scheduleCD();
    expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(1)
    expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(0)
  });

  it('should call cdRef#markForCheck 4 times when scheduleCD is called multiple times sync', () => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[nativeStrategyName];
    strategy.scheduleCD();
    strategy.scheduleCD();
    strategy.scheduleCD();
    strategy.scheduleCD();
    expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(4);
    expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(0);
  });

  it('should call cdRef#markForCheck 6 times when scheduleCD or rxScheduleCD is called', (done) => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[nativeStrategyName];
    strategy.detectChanges = createSpy('detectChanges')
    strategy.scheduleCD();
    strategy.rxScheduleCD(from([0,1,2,3,4,5])).subscribe({
      complete: () => {
        expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(7);
        expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(0);
        expect(strategy.detectChanges).toHaveBeenCalledTimes(0);
        done();
      }
    });
  });

});
