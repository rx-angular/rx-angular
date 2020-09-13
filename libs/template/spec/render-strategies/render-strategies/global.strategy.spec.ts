// tslint:disable-next-line:nx-enforce-module-boundaries
import { getStrategies } from '../../../src/lib/render-strategies';
import { CallsExpectations, getMockStrategyConfig, testStrategyMethod } from '../../fixtures';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, Component } from '@angular/core';
import { LetDirective } from '@rx-angular/template';

@Component({
  template: ``
})
class GlobalStrategyTestComponent {
  constructor(public cdRef: ChangeDetectorRef) {
  }
}

let fixture: ComponentFixture<GlobalStrategyTestComponent>;
let component: GlobalStrategyTestComponent;
let nativeElement: HTMLElement;

const setupTestComponent = () => {
  TestBed.configureTestingModule({
    declarations: [GlobalStrategyTestComponent, LetDirective]
  }).compileComponents();
};

const setUpFixture = () => {
  fixture = TestBed.createComponent(GlobalStrategyTestComponent);
  component = fixture.componentInstance;
  nativeElement = fixture.nativeElement;
};

/**
 * GLOBAL STRATEGY
 * Based on markDirty.
 */

const strategyName = 'global';

const callsExpectations: CallsExpectations = {
  detectChanges: 0,
  markForCheck: 0,
  detach: 0,
  reattach: 0
};

describe('global Strategy', () => {
  // beforeAll(() => mockConsole());
  beforeEach(async(setupTestComponent));
  beforeEach(setUpFixture);

  describe('declaration', () => {
    it('should be present in strategies map', () => {
      const strategy = getStrategies(getMockStrategyConfig())[strategyName];
      expect(strategy).toBeDefined();
    });

    it(`should have ${strategyName} as name`, () => {
      const strategy = getStrategies(getMockStrategyConfig())[strategyName];
      expect(strategy.name).toBe(strategyName);
    });

    it(`should mark component as dirty`, () => {
      const strategy = getStrategies({ cdRef: component.cdRef })[strategyName];
      /*
      LViewDebug
      https://github.com/angular/angular/blob/2c4a98a28594afc16a481ff4fc56cb37ce1a04b0/packages/core/src/render3/instructions/lview_debug.ts


      https://github.com/angular/angular/blob/2c4a98a28594afc16a481ff4fc56cb37ce1a04b0/packages/core/src/render3/interfaces/view.ts#L351
      markViewDirty(component[__ngContext__])!; === component[__ngContext__][2].Dirty = 0b000001000000; // LViewFlags.Dirty
      */
      const dirtyValue = 0b000001000000;
      function isDirty(c: any) {
        // These are the flags from non-readable __ngContext__.
        // For some reason it is in different places when you try to run this function second time. But it is working!
        const componentFlags = c.__ngContext__[2] || c.__ngContext__.lView[2];

        // See this line https://github.com/angular/angular/blob/2c4a98a28594afc16a481ff4fc56cb37ce1a04b0/packages/core/src/render3/instructions/lview_debug.ts#L391
        // tslint:disable-next-line: no-bitwise
        return !!(componentFlags & dirtyValue);
      }
      fixture.detectChanges();
      expect(isDirty(component)).toBeFalsy();
      strategy.scheduleCD();
      expect(isDirty(component)).toBeTruthy();

    });


  });

  describe('rxScheduleCD', () => {
    it('should call cdRef#detectChanges & cdRef#markForCheck 0 times when rxScheduleCD is used with a single sync emission', (done) => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'rxScheduleCD',
        singleTime: true,
        callsExpectations
      }, done);
    });

    it('should call cdRef#detectChanges & cdRef#markForCheck 0 times when rxScheduleCD is used with multiple sync emissions', (done) => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'rxScheduleCD',
        singleTime: false,
        callsExpectations
      }, done);
    });
  });

  xdescribe('scheduleCD', () => {
    it('should call cdRef#detectChanges & cdRef#markForCheck 0 times when scheduleCD is called a single time', (done) => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'scheduleCD',
        flushMicrotask: true,
        singleTime: true,
        callsExpectations
      }, done);
    });

    it(`should call cdRef#detectChanges  0 times when scheduleCD is called multiple times sync`, (done) => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'scheduleCD',
        flushMicrotask: true,
        singleTime: false,
        callsExpectations
      }, done);
    });
  });

  xdescribe('combined scheduleCD & rxScheduleCD', () => {
    it('should call strategy#detectChanges 0 times when scheduleCD or rxScheduleCD is called', (done) => {
      testStrategyMethod({
        strategyName,
        strategyMethod: 'scheduleCD',
        flushMicrotask: true,
        singleTime: false,
        callsExpectations
      }, done);

      testStrategyMethod({
        strategyName,
        strategyMethod: 'rxScheduleCD',
        singleTime: false,
        callsExpectations
      }, () => {
      });
    });
  });

  xit(`@TODO TEST call of markDirty`, () => {
    expect(0).toBe(1);
  });

});

