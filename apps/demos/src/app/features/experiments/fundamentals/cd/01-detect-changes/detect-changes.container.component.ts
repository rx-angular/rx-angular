import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CdHelper } from '../../../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-cd-parent01',
  template: `
    <rxa-cd-default>
      <rxa-cd-default>
        <rxa-cd-on-push>
        </rxa-cd-on-push>
      </rxa-cd-default>
      <rxa-cd-on-push>
      </rxa-cd-on-push>
    </rxa-cd-default>
  `,
  styles: [`
    :host {
      width: 900px;
      display: flex;
    }
  `],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  providers: [CdHelper]
})
export class DetectChangesContainerComponent {

}
