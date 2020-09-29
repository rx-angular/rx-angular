import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { Hooks } from '../hooks';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rxa-dirty-check',
  template: `
    <div class="num-dirty-checks" matRipple [matRippleColor]="color" [matRippleRadius]="radius">
      {{ numDirtyChecks() }}
    </div>
  `,
  styleUrls: ['./dirty-checks.component.scss']
})
export class DirtyChecksComponent extends Hooks {
  @ViewChild(MatRipple) ripple: MatRipple;

  renders = 0;

  @Input()
  rippleOn = true;


  @Input()
  radius = 40;

  @Input()
  color = 'rgba(253,255,0,0.24)'

  constructor() {
    super();
    this.afterViewInit$.subscribe(() => this.ripple.launch({ centered: true }));
  }

  numDirtyChecks() {
    if (this.ripple) {
      // tslint:disable-next-line:no-unused-expression
      this.rippleOn && this.ripple.launch({ centered: true });
    }
    return ++this.renders;
  }
}
