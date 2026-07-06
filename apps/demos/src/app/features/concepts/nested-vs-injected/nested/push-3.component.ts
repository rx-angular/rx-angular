import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdHelper } from '../../../../shared/utils/cd-helper';
import { VisualizerComponent } from '../../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
import { CdTriggerComponent } from '../../../../shared/debug-helper/cd-trigger/cd-trigger/cd-trigger.component';
import { CdDefault4Component } from './default-4.component';

@Component({
  selector: 'rxa-cd-push-3',
  template: ` <rxa-visualizer>
    <ng-container visualizerHeader>
      <h3>OnPush</h3>
      <rxa-cd-trigger [cdHelper]="cdHelper"></rxa-cd-trigger>
      <ng-content select="[cdDefaultHeader]"></ng-content>
    </ng-container>
    <rxa-cd-default-4></rxa-cd-default-4>
  </rxa-visualizer>`,
  host: {
    class: 'd-block w-100',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CdHelper],
  imports: [VisualizerComponent, CdTriggerComponent, CdDefault4Component],
})
export class CdOnPush3Component {
  constructor(public cdHelper: CdHelper) {}
}
