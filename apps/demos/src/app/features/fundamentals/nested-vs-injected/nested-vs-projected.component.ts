import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdHelper } from '../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-cd',
  template: `
    <div class="row">
      <div class="col-sm-6">
        <h3>Nested</h3>
        <rxa-cd-nested></rxa-cd-nested>
      </div>
      <div class="col-sm-6">
        <h3>Projected</h3>
        <rxa-cd-injected></rxa-cd-injected>
      </div>
    </div>
  `,
  providers: [CdHelper],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NestedVsProjectedComponent {

}
