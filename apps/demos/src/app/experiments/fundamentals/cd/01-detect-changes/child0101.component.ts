import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-cd01-child0101-push',
  template: `
    <div class="base-info">
      <span>CD: <b class="cds">OnPush</b></span>
      <renders></renders>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Child010101Component {}
