import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdHelper } from '../../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-cd-push-3',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h3>OnPush</h3>
        <rxa-cd-trigger [cdHelper]="cdHelper"></rxa-cd-trigger>
        <ng-content select="[cdDefaultHeader]"></ng-content>
      </ng-container>
      <rxa-cd-default-4></rxa-cd-default-4>
    </rxa-visualizer>`,
  host: {
    class: 'd-block w-100'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CdHelper]
})
export class CdOnPush3Component {
  constructor(public cdHelper: CdHelper) {
  }
}
