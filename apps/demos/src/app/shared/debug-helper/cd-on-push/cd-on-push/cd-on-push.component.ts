import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdHelper } from '../../../utils/cd-helper';

@Component({
  selector: 'rxa-cd-on-push',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h3>OnPush</h3>
        <rxa-cd-trigger [cdHelper]="cdHelper"></rxa-cd-trigger>
        <ng-content select="[cdOnPushHeader]"></ng-content>
      </ng-container>
      <ng-content>
      </ng-content>
    </rxa-visualizer>`,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CdHelper]
})
export class CdOnPushComponent {
  constructor(public cdHelper: CdHelper) {
  }
}
