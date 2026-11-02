import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdTriggerComponent } from '../../../../shared/debug-helper/cd-trigger/cd-trigger/cd-trigger.component';
import { VisualizerComponent } from '../../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
import { CdHelper } from '../../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-cd-push-2',
  template: ` <rxa-visualizer>
    <ng-container visualizerHeader>
      <h3>OnPush</h3>
      <rxa-cd-trigger [cdHelper]="cdHelper"></rxa-cd-trigger>
      <ng-content select="[cdDefaultHeader]"></ng-content>
    </ng-container>
    <ng-content></ng-content>
  </rxa-visualizer>`,
  host: {
    class: 'd-block w-100',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CdHelper],
  imports: [VisualizerComponent, CdTriggerComponent],
})
export class CdOnPush2Component {
  constructor(public cdHelper: CdHelper) {}
}
