import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-cd06-child01-default',
  template: `
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
      <renders></renders>
    </div>
    <div class="case-content">
      <app-cd06-child0101-push></app-cd06-child0101-push>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Child0601Component {}
