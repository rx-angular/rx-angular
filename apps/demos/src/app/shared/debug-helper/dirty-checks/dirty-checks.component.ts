import { Component, Input, signal, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'rxa-dirty-check',
  template: `
    <div
      class="indicator-ripple"
      [style]="{ width: 'fit-content', height: radius + 'px' }"
      matRipple
      [matRippleColor]="color"
      [matRippleRadius]="radius"
    >
      {{ dirtyChecks() }}
    </div>
  `,
  styles: [
    `
      :host .indicator-ripple {
        border: 1px solid #ffff005f;
        border-radius: 10px;
      }
    `,
  ],
  imports: [MatRipple],
})
export class DirtyChecksComponent {
  @ViewChild(MatRipple) ripple: MatRipple;

  readonly dirtyChecks = signal(0);

  @Input()
  rippleOn = true;

  @Input()
  radius = 30;

  @Input()
  color = 'rgba(253,255,0,0.24)';

  @Input()
  rippleEffect = { centered: true };

  @Input()
  log;

  ngDoCheck() {
    this.dirtyChecks.update((n) => n + 1);
    if (this.log) {
      console.log('dirtyCheck', this.log);
    }
    if (this.rippleOn) {
      this.rippleOn && this.ripple && this.ripple.launch(this.rippleEffect);
    }
  }
}
