import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'rxa-cd03-child01-default',
  template: `
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
      <renders></renders>
    </div>
    <div class="case-content">
      <rxa-cd03-child0101-push></rxa-cd03-child0101-push>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class Child0301Component {
}
