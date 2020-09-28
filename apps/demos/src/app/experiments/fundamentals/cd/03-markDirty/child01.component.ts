import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-cd03-child01-default',
  template: `
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
      <renders></renders>
    </div>
    <div class="case-content">
      <app-cd03-child0101-push></app-cd03-child0101-push>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class Child0301Component {
}
