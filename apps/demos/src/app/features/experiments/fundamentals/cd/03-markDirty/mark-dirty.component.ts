import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Subject } from 'rxjs';
import { CdHelper } from '../../../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-cd-parent03',
  template: `
    <h2>
      C 03
      <small
      >ɵmarkDirty when called in the component renders itself and all child
        components with cd.Default
      </small
      >
    </h2>
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
      <rxa-dirty-check></rxa-dirty-check>
    </div>
    <div class="case-interaction">
      <button mat-raised-button [unpatch] (click)="cdHelper.markDirty()">ɵmarkDirty</button>
    </div>
    <div class="case-content">
      <rxa-cd03-child01-default></rxa-cd03-child01-default>
      <rxa-cd03-child02-push></rxa-cd03-child02-push>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [CdHelper]
})
export class MarkDirtyComponent {
  constructor(public cdHelper: CdHelper) {}
}
