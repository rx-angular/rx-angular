import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdHelper } from '../../../utils/cd-helper';

@Component({
  selector: 'rxa-cd-default',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h3>Default</h3>
        <rxa-cd-trigger [cdHelper]="cdHelper"></rxa-cd-trigger>
        <ng-content select="[cdDefaultHeader]"></ng-content>
      </ng-container>
      <ng-content></ng-content>

    </rxa-visualizer>`,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [CdHelper]
})
export class CdDefaultComponent {
  constructor(public cdHelper: CdHelper) {
  }
}
