import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdHelper } from '../../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-cd-default-3',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h3>Default</h3>
        <rxa-cd-trigger [cdHelper]="cdHelper"></rxa-cd-trigger>
        <ng-content select="[cdDefaultHeader]"></ng-content>
      </ng-container>
      <ng-content></ng-content>
    </rxa-visualizer>`,
  host: {
    class: 'd-block w-100'
  },
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [CdHelper]
})
export class CdDefault3Component {
  constructor(public cdHelper: CdHelper) {
  }
}
