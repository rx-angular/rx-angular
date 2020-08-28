import { from, of } from 'rxjs';
import { getStrategies, RenderStrategyFactoryConfig } from '@rx-angular/template';
import { getMockStrategyConfig } from './mock-strategies';
import { fakeAsync, tick } from '@angular/core/testing';

export const singleEmission$ = of(0);
export const multipleEmissions$ = from(Array(6).map((v, i) => i));


export function callOnce(fn: (...args: any) => unknown, args, cb: Function) {
  fakeAsync(() => {
    fn(...args);
    tick(100);
    cb();
  })
};

export function callMultiple(numCalls: number, fn: (...args: any) => unknown, ...args) {
  Array(numCalls)
    .fill(0)
    .forEach(
      fakeAsync(() => {
      fn(...args);
      tick(100);
    }));
};

export function singleEmissionMarkForCheck(done) {
  return (strategyName: string, numCalls: number) => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[strategyName];
    strategy.rxScheduleCD(singleEmission$).subscribe({
      complete: () => {
        expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(numCalls);
        done();
      }
    });
  }
}

export function singleEmissionDetectChanges(done) {
  return (strategyName: string, numCalls: number) => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[strategyName];
    strategy.rxScheduleCD(singleEmission$).subscribe({
      complete: () => {
        expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(numCalls);
        done();
      }
    });
  }
}

export function multipleEmissionMarkForCheck(done) {
  return (strategyName: string, numCalls: number) => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[strategyName];
    strategy.rxScheduleCD(multipleEmissions$).subscribe({
      complete: () => {
        expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(numCalls);
        done();
      }
    });
  }
}

export function multipleEmissionDetectChanges(done) {
  return (strategyName: string, numCalls: number) => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[strategyName];
    strategy.rxScheduleCD(multipleEmissions$).subscribe({
      complete: () => {
        expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(numCalls);
        done();
      }
    });
  }
}


export function singleCallMarkForCheck(done) {
  return (strategyName: string, numCalls: number) => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[strategyName];
    callOnce(strategy.scheduleCD, [], () => {
      expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(numCalls);
      done();
    });

  }
}

export function singleCallDetectChanges(done) {
  return (strategyName: string, numCalls: number) => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[strategyName];
    strategy.rxScheduleCD(singleEmission$).subscribe({
      complete: () => {
        expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(numCalls);
        done();
      }
    });
  }
}

export function multipleCallsMarkForCheck(done) {
  return (strategyName: string, numCalls: number) => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[strategyName];
    strategy.rxScheduleCD(multipleEmissions$).subscribe({
      complete: () => {
        expect(cfg.cdRef.markForCheck).toHaveBeenCalledTimes(numCalls);
        done();
      }
    });
  }
}

export function multipleCallsDetectChanges(done) {
  return (strategyName: string, numCalls: number) => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[strategyName];
    strategy.rxScheduleCD(multipleEmissions$).subscribe({
      complete: () => {
        expect(cfg.cdRef.detectChanges).toHaveBeenCalledTimes(numCalls);
        done();
      }
    });
  }
}
