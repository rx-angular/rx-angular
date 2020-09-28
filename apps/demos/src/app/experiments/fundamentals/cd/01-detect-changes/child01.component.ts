import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cd01-child01-default',
  template: `
    <div class="base-info">
      <span>CD: <b class="cds">Default</b></span>
      <renders></renders>
      g
    </div>
    <div class="case-content">
      <app-cd01-child0101-push></app-cd01-child0101-push>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})
export class Child0101Component {
}
