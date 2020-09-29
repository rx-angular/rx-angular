import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'rxa-cd06-child0101-push',
  template: `
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
      <renders></renders>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Child060101Component {}
