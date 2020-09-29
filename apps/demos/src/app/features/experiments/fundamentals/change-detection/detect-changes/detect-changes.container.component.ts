import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdHelper } from '../../../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-cd-parent01',
  template: `
    <rxa-cd-default>
      <div class="row w-100">
        <div class="col-sm-12 col-md-6">
          <h2 class="mat-subheader">CD Default</h2>
          <rxa-cd-default>
            <rxa-cd-on-push>
            </rxa-cd-on-push>
          </rxa-cd-default>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2 class="mat-subheader">CD OnPush</h2>
          <rxa-cd-on-push>
          </rxa-cd-on-push>
        </div>
      </div>
    </rxa-cd-default>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [CdHelper]
})
export class DetectChangesContainerComponent {

}
