import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StrategySelectComponent } from './strategy-select.component';

@Component({
  template: `<rxa-strategy-select></rxa-strategy-select>`,
  imports: [StrategySelectComponent],
})
class HostComponent {}

describe('StrategySelectComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
  });

  it('renders the current primary strategy in the select trigger on first paint', async () => {
    // MatSelect resolves its initial [value] against the projected mat-options
    // in a microtask (see MatSelect#_initializeSelection). The mat-option list
    // itself must therefore already be populated by the time that single
    // microtask flush runs, otherwise the trigger is left empty. This mirrors
    // the "first paint" a user actually sees, before any click re-triggers CD.
    fixture.detectChanges();
    await Promise.resolve();
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector(
      '.mat-mdc-select-value-text, .mat-select-value-text',
    );

    expect(trigger?.textContent?.trim()).toBe('normal');
  });
});
