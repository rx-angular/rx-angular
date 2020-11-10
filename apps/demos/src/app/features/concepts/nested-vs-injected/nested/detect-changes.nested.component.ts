import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdHelper } from '../../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-cd-nested',
  template: `
    <rxa-cd-default-1>
    </rxa-cd-default-1>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [CdHelper]
})
export class DetectChangesNestedComponent {

}
