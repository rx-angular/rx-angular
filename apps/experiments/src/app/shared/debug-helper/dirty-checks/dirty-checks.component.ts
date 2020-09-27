import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'renders',
  template: `
    <div class="num-dirty-checks" matRipple [matRippleColor]="color" [matRippleRadius]="radius">
      {{ numDirtyChecks() }}
    </div>

  `,
  styleUrls: ['./dirty-checks.component.scss']
})
export class DirtyChecksComponent implements AfterViewInit {
  @ViewChild(MatRipple) ripple: MatRipple;

  renders = 0;

  @Input()
  radius = 40;

  @Input()
  color = 'rgba(253,255,0,0.24)'

  constructor() {}

  ngAfterViewInit(): void {
    this.ripple.launch({ centered: true });
  }

  numDirtyChecks() {
    if (this.ripple) {
      this.ripple.launch({ centered: true });
    }
    return ++this.renders;
  }
}
