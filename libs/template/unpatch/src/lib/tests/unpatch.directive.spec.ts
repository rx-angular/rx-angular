/// <reference types="zone.js" />
import { ApplicationRef, Component, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UnpatchDirective } from '../unpatch.directive';
import { UnpatchModule } from '../unpatch.module';

describe(UnpatchDirective.name, () => {
  enum LogEvent {
    Click = 'click',
    Mouseenter = 'mouseenter',
  }

  const logs: [string, boolean][] = [];

  @Component({
    template: `
      <div
        [unpatch]="unpatch"
        (click)="log(LogEvent.Click)"
        (mouseenter)="log(LogEvent.Mouseenter)"
      ></div>
    `,
  })
  class TestComponent {
    unpatch?: string[];

    LogEvent = LogEvent;

    log(event: LogEvent): void {
      logs.push([event, NgZone.isInAngularZone()]);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UnpatchModule],
      declarations: [TestComponent],
      teardown: { destroyAfterEach: true },
    });
  });

  afterEach(() => {
    logs.length = 0;
  });

  it('should re-apply click and mouseenter listeners using the unpatched API', () => {
    // Arrange
    const fixture = TestBed.createComponent(TestComponent);
    const appRef = TestBed.inject(ApplicationRef);
    const div = fixture.debugElement.query(By.css('div'));
    const addEventListener = jest.spyOn(
      div.nativeElement,
      Zone.__symbol__('addEventListener')
    );

    // Act
    fixture.detectChanges();
    const tick = jest.spyOn(appRef, 'tick');
    div.nativeElement.dispatchEvent(new Event('click'));
    div.nativeElement.dispatchEvent(new Event('mouseenter'));

    try {
      // Assert
      expect(logs).toEqual([
        [LogEvent.Click, false],
        [LogEvent.Mouseenter, false],
      ]);
      // Let's ensure that change detection hasn't been run.
      expect(tick).toHaveBeenCalledTimes(0);
      expect(addEventListener).toHaveBeenCalledTimes(2);
    } finally {
      tick.mockRestore();
      addEventListener.mockRestore();
    }
  });

  it('should re-apply only provided event listeners', () => {
    // Arrange
    const fixture = TestBed.createComponent(TestComponent);
    fixture.componentInstance.unpatch = ['mouseenter'];
    const appRef = TestBed.inject(ApplicationRef);
    const div = fixture.debugElement.query(By.css('div'));
    const addEventListener = jest.spyOn(
      div.nativeElement,
      Zone.__symbol__('addEventListener')
    );

    // Act
    fixture.detectChanges();
    const tick = jest.spyOn(appRef, 'tick');
    div.nativeElement.dispatchEvent(new Event('click'));
    div.nativeElement.dispatchEvent(new Event('mouseenter'));

    try {
      // Assert
      expect(logs).toEqual([
        [LogEvent.Click, true],
        [LogEvent.Mouseenter, false],
      ]);
      // Change detection has been run once since we unpatched only `mouseenter`.
      expect(tick).toHaveBeenCalledTimes(1);
      expect(addEventListener).toHaveBeenCalledTimes(1);
    } finally {
      tick.mockRestore();
      addEventListener.mockRestore();
    }
  });
});
