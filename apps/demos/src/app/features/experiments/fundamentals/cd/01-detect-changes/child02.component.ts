import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'rxa-cd01-child02-push',
  template: `
    <div class="base-info">
      <span>CD: <b class="cds">OnPush</b></span>
      <rxa-dirty-check></rxa-dirty-check>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Child0102Component {}
