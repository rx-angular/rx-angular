import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdHelper } from '../../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-cd-default-1',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h3>Default</h3>
        <rxa-cd-trigger [cdHelper]="cdHelper"></rxa-cd-trigger>
        <ng-content select="[cdDefaultHeader]"></ng-content>
      </ng-container>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <rxa-cd-default-2>
          </rxa-cd-default-2>
        </div>
        <div class="col-sm-12 col-md-6">
          <rxa-cd-push-3>
          </rxa-cd-push-3>
        </div>
      </div>
    </rxa-visualizer>`,
  host: {
    class: 'd-block w-100'
  },
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [CdHelper]
})
export class CdDefault1Component {
  constructor(public cdHelper: CdHelper) {
  }
}
