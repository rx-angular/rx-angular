import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdHelper } from '../../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-cd-default-2',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h3>Default 2</h3>
        <rxa-cd-trigger [cdHelper]="cdHelper"></rxa-cd-trigger>
        <ng-content select="[cdDefaultHeader]"></ng-content>
      </ng-container>
      <rxa-cd-push-1></rxa-cd-push-1>
    </rxa-visualizer>`,
  host: {
    class: 'd-block w-100'
  },
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [CdHelper]
})
export class CdDefault2Component {
  constructor(public cdHelper: CdHelper) {
  }
}
