import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-cd03-child02-push',
  template: `
    <div class="case-info">
      <span>CD: <b class="cds">OnPush</b></span>
      <renders></renders>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child0302Component {

}

