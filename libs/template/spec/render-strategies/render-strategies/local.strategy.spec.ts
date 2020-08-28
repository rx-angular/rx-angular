// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import { getStrategies } from '@rx-angular/template';
import {
  getMockStrategyConfig, multipleCallsDetectChanges, multipleCallsMarkForCheck,
  multipleEmissionDetectChanges, multipleEmissionMarkForCheck, singleCallDetectChanges, singleCallMarkForCheck,
  singleEmissionDetectChanges,
  singleEmissionMarkForCheck
} from '../../fixtures';
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
    expect(strategy.name).toBe(strategyName );
  });

  it('should call cdRef#detectChanges 1 times when rxScheduleCD is used with a single sync emission', (done) => {
    singleEmissionDetectChanges(done)(strategyName, 1)
  });

  it('should call cdRef#markForCheck 0 times when rxScheduleCD is used with a single sync emission', (done) => {
    singleEmissionMarkForCheck(done)(strategyName, 0)
  });

  it('should call cdRef#detectChanges 1 times when rxScheduleCD is used with multiple sync emissions', (done) => {
    multipleEmissionDetectChanges(done)(strategyName, 1);
  });

  it('should call cdRef#markForCheck 0 times when rxScheduleCD is used with multiple sync emissions', (done) => {
    multipleEmissionMarkForCheck(done)(strategyName, 0);
  });

  it('should call cdRef#detectChanges 1 times when scheduleCD is called a single time', (done) => {
    singleCallDetectChanges(done)(strategyName, 1);
  });

  it('should call cdRef#markForCheck 0 times when scheduleCD is called a single time', (done) => {
    singleCallMarkForCheck(done)(strategyName, 0);
  });

  it('should call cdRef#detectChanges 1 times when scheduleCD is called multiple times sync', (done) => {
    multipleCallsDetectChanges(done)(strategyName, 1);
  });

  it('should call cdRef#markForCheck 0 times when scheduleCD is called multiple times sync', (done) => {
    multipleCallsMarkForCheck(done)(strategyName, 0);
  });

  it('should call strategy#detectChanges 1 times when scheduleCD or rxScheduleCD is called', (done) => {
    multipleEmissionDetectChanges(done)(strategyName, 1);
    multipleCallsDetectChanges(done)(strategyName, 1);
  });

  it('should call strategy#markForCheck 0 times when scheduleCD or rxScheduleCD is called', (done) => {
    multipleEmissionMarkForCheck(done)(strategyName, 0);
    multipleCallsMarkForCheck(done)(strategyName, 0);
  });


});
