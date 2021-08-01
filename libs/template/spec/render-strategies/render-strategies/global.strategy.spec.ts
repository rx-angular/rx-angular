// tslint:disable:nx-enforce-module-boundaries
import { getStrategies } from '../../../src/lib/render-strategies/strategies/strategies-map';
import * as AngularCore from '@angular/core';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  CallsExpectations,
  getMockStrategyConfig,
  testStrategyMethod,
} from '../../fixtures';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LetDirective } from '@rx-angular/template/let';

@Component({
  template: ``,
})
class GlobalStrategyTestComponent {
  constructor(public cdRef: ChangeDetectorRef) {}
}

let fixture: ComponentFixture<GlobalStrategyTestComponent>;
let component: GlobalStrategyTestComponent;
let nativeElement: HTMLElement;

const setupTestComponent = () => {
  TestBed.configureTestingModule({
    declarations: [GlobalStrategyTestComponent, LetDirective],
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
  reattach: 0,
  afterCD: 1,
};

describe('global Strategy', () => {
  // beforeAll(() => mockConsole());
  beforeEach(waitForAsync(setupTestComponent));
  beforeEach(setUpFixture);
  beforeEach(spyOnMarkDirty);

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
      strategy.scheduleCD();
      expect(AngularCore['ɵmarkDirty']).toHaveBeenCalledWith(component);
    });
  });

  describe('rxScheduleCD', () => {
    it('should call cdRef#detectChanges & cdRef#markForCheck 0 times when rxScheduleCD is used with a single sync emission', (done) => {
      testStrategyMethod(
        {
          strategyName,
          strategyMethod: 'rxScheduleCD',
          singleTime: true,
          callsExpectations,
        },
        done
      );
    });

    it('should call cdRef#detectChanges & cdRef#markForCheck 0 times when rxScheduleCD is used with multiple sync emissions', (done) => {
      testStrategyMethod(
        {
          strategyName,
          strategyMethod: 'rxScheduleCD',
          singleTime: false,
          callsExpectations,
        },
        done
      );
    });
  });

  describe('scheduleCD', () => {
    it(
      'should call cdRef#detectChanges & cdRef#markForCheck 0 times and afterCD 1 time when scheduleCD is called a' +
        ' single' +
        ' time',
      (done) => {
        testStrategyMethod(
          {
            strategyName,
            strategyMethod: 'scheduleCD',
            flushMicrotask: true,
            singleTime: true,
            afterCD: jest.fn(),
            callsExpectations,
          },
          done
        );
      }
    );

    it(`should call cdRef#detectChanges  0 times and afterCD 1 time when scheduleCD is called multiple times sync`, (done) => {
      testStrategyMethod(
        {
          strategyName,
          strategyMethod: 'scheduleCD',
          flushMicrotask: true,
          singleTime: false,
          afterCD: jest.fn(),
          callsExpectations,
        },
        done
      );
    });
  });

  describe('combined scheduleCD & rxScheduleCD', () => {
    it('should call strategy#detectChanges 0 times when scheduleCD or rxScheduleCD is called', (done) => {
      testStrategyMethod(
        {
          strategyName,
          strategyMethod: 'scheduleCD',
          flushMicrotask: true,
          singleTime: false,
          callsExpectations,
        },
        done
      );

      testStrategyMethod(
        {
          strategyName,
          strategyMethod: 'rxScheduleCD',
          singleTime: false,
          callsExpectations,
        },
        () => {}
      );
    });
  });

  xit(`@TODO TEST call of markDirty`, () => {
    expect(0).toBe(1);
  });
});

function spyOnMarkDirty() {
  jest.spyOn(AngularCore, 'ɵmarkDirty').mockImplementation(() => undefined);
}
