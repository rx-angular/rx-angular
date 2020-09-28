import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'rxa-cd06-child01-default',
  template: `
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
      <renders></renders>
    </div>
    <div class="case-content">
      <rxa-cd06-child0101-push></rxa-cd06-child0101-push>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Child0601Component {}
