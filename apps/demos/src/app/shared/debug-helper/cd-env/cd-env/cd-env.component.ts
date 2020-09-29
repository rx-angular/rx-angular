import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CdHelper } from '../../../utils/cd-helper';

@Component({
  selector: 'rxa-cd-env',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h3>{{changeDetection}}</h3>
        <rxa-cd-trigger [cdHelper]="cdHelper"></rxa-cd-trigger>
        <ng-content select="[cdDefaultHeader]"></ng-content>
      </ng-container>
      <ng-content></ng-content>

    </rxa-visualizer>`,
  host: {
    class: 'd-block w-100'
  },
  changeDetection: environment.changeDetection,
  providers: [CdHelper]
})
export class CdEnvComponent {
  changeDetection = environment.changeDetection;
  constructor(public cdHelper: CdHelper) {
  }
}
