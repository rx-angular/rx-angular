import { ChangeDetectorRef } from '@angular/core';
import { getStrategies, RenderStrategy } from '@rx-angular/template';
import { from, of } from 'rxjs';
import { getMockStrategyConfig } from './mock-strategies';

export const oneCall = true;
export const multipleCalls = false;
export const singleEmission$ = of(0);
export const numMultipleCalls = 6;
export const multipleEmissions$ = from(
  Array(numMultipleCalls).map((v, i) => i)
);

export function testStrategyMethod(
  config: StrategyTestConfig,
  done: jest.DoneCallback | any
) {
  testsMap.get(config.strategyMethod)(config, done);
}

const testsMap = new Map<keyof RenderStrategy, Function>([
  ['rxScheduleCD', testRxScheduleCD],
  ['scheduleCD', testScheduleCD],
  ['detectChanges', testDetectChanges]
]);

function testRxScheduleCD(
  config: StrategyTestConfig,
  done: jest.DoneCallback | any
) {
  const { strategyName, singleTime, callsExpectations } = config;
  const cfg = getMockStrategyConfig();
  const renderStrategy = getStrategies(cfg)[strategyName];

  renderStrategy
    .rxScheduleCD(singleTime ? singleEmission$ : multipleEmissions$)
    .subscribe({
      complete: () => {
        checkExpectations(cfg, callsExpectations);
        done();
      }
    });
}

function testScheduleCD(config: StrategyTestConfig, done: jest.DoneCallback | any) {
  const { strategyName, singleTime, callsExpectations } = config;
  const cfg = getMockStrategyConfig();
  const renderStrategy = getStrategies(cfg)[strategyName];

  for (let i = 0; i < (singleTime ? 1 : numMultipleCalls); i++) {
    renderStrategy.scheduleCD();
  }

  setTimeout(() => {
    checkExpectations(cfg, callsExpectations);
    if (done) {
      done();
    }
  }, 200);
  return cfg;
}

function testDetectChanges(config: StrategyTestConfig, done: jest.DoneCallback | any) {
  const { strategyName, singleTime, callsExpectations } = config;
  const cfg = getMockStrategyConfig();
  const renderStrategy = getStrategies(cfg)[strategyName];

  for (let i = 0; i < (singleTime ? 1 : numMultipleCalls); i++) {
    renderStrategy.detectChanges();
  }

  setTimeout(() => {
    checkExpectations(cfg, callsExpectations);
    if (done) {
      done();
    }
  }, 200);
  return cfg;
}

function expectationDefined(
  expectCallTimes: CallsExpectations,
  key: keyof CallsExpectations
): boolean {
  return expectCallTimes[key] !== undefined && expectCallTimes[key] !== null;
}

function checkExpectations(
  cfg: { cdRef: ChangeDetectorRef },
  expectations: CallsExpectations
) {
  /**
   * Using manual if instead of Object.keys to have
   * more transparent messages in case if test fails
   */
  if (expectationDefined(expectations, 'detectChanges')) {
    expect(cfg.cdRef['detectChanges']).toHaveBeenCalledTimes(
      expectations.detectChanges
    );
  }

  if (expectationDefined(expectations, 'markForCheck')) {
    expect(cfg.cdRef['markForCheck']).toHaveBeenCalledTimes(
      expectations.markForCheck
    );
  }

  if (expectationDefined(expectations, 'detach')) {
    expect(cfg.cdRef['detach']).toHaveBeenCalledTimes(expectations.detach);
  }

  if (expectationDefined(expectations, 'reattach')) {
    expect(cfg.cdRef['reattach']).toHaveBeenCalledTimes(expectations.reattach);
  }
}

interface StrategyTestConfig {
  strategyName: string;
  strategyMethod: keyof RenderStrategy;
  singleTime: boolean;
  callsExpectations: CallsExpectations;
  flushMicrotask?: boolean;
}

export interface CallsExpectations {
  markForCheck?: number;
  detectChanges?: number;
  detach?: number;
  reattach?: number;
}
