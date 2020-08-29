import { from, of } from 'rxjs';
import { getStrategies, RenderStrategy } from '@rx-angular/template';
import { getMockStrategyConfig } from './mock-strategies';

export const oneCall = true;
export const multipleCalls = false;
export const singleEmission$ = of(0);
export const numMultipleCalls = 6;
export const multipleEmissions$ = from(Array(numMultipleCalls).map((v, i) => i));

export function testRxScheduleCDMethod(done) {
  return (methodName: string, strategyName: string, singleEmission: boolean, numCalls: number) => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[strategyName];
    strategy.rxScheduleCD(singleEmission ? singleEmission$ : multipleEmissions$).subscribe({
      complete: () => {
        expect(cfg.cdRef[methodName]).toHaveBeenCalledTimes(numCalls);
        done();
      }
    });
  };
}

export function runStrategyMethod<K extends keyof RenderStrategy>() {
  return (strategyMethodName: K, strategyName: string, singleCall: boolean) => {
    const cfg = getMockStrategyConfig();
    const strategy = getStrategies(cfg)[strategyName];
    Array(singleCall ? 1 : numMultipleCalls)
      .fill(0)
      .forEach(() => {
        console.log('runStrategyMethod', strategyMethodName);
        strategy[strategyMethodName as string]();
      });
    return cfg;
  };
}
