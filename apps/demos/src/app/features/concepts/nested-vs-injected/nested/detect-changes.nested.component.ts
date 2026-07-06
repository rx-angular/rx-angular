import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdHelper } from '../../../../shared/utils/cd-helper';
import { CdDefault1Component } from './default-1.component';

@Component({
  selector: 'rxa-cd-nested',
  template: ` <rxa-cd-default-1> </rxa-cd-default-1> `,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [CdHelper],
  imports: [CdDefault1Component],
})
export class DetectChangesNestedComponent {}
