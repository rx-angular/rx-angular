import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StrategySelectComponent } from './strategy-select.component';

@Component({
  template: `<rxa-strategy-select></rxa-strategy-select>`,
  imports: [StrategySelectComponent],
})
class HostComponent {}

describe('StrategySelectComponent', () => {
  it('shows the primary strategy once rxFor rendered the options', async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent, NoopAnimationsModule],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    // Only the app's own CD may run: a manual detectChanges() here would
    // refresh MatSelect's @ContentChildren and hide the bug (#1920).
    fixture.autoDetectChanges();

    // rxFor renders through the render-strategy scheduler, outside of CD.
    await new Promise((resolve) => setTimeout(resolve, 100));

    const trigger = fixture.nativeElement.querySelector(
      '.mat-mdc-select-value-text',
    );
    expect(trigger?.textContent?.trim()).toBe('normal');
  });
});
