import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'renders',
  template: `
    <div class="num-dirty-checks" matRipple [matRippleColor]="'rgba(68,68,200,0.24)'">
      {{ numDirtyChecks() }}
    </div>
  `,
  styleUrls: ['./dirty-checks.component.scss']
})
export class DirtyChecksComponent {
  @ViewChild(MatRipple) ripple: MatRipple;

  renders = 0;

  numDirtyChecks() {
    if (this.ripple) {
      this.ripple.launch({ centered: true });
    }
    return ++this.renders;
  }
}
