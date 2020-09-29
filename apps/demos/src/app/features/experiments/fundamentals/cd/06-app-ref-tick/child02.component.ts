import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-cd06-child02-push',
  template: `
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
      <rxa-dirty-check></rxa-dirty-check>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Child0602Component {}
