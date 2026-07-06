import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdHelper } from '../../../../shared/utils/cd-helper';
import { VisualizerComponent } from '../../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
import { CdTriggerComponent } from '../../../../shared/debug-helper/cd-trigger/cd-trigger/cd-trigger.component';

@Component({
  selector: 'rxa-cd-default-3',
  template: ` <rxa-visualizer>
    <ng-container visualizerHeader>
      <h3>Default</h3>
      <rxa-cd-trigger [cdHelper]="cdHelper"></rxa-cd-trigger>
      <ng-content select="[cdDefaultHeader]"></ng-content>
    </ng-container>
    <ng-content></ng-content>
  </rxa-visualizer>`,
  host: {
    class: 'd-block w-100',
  },
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [CdHelper],
  imports: [VisualizerComponent, CdTriggerComponent],
})
export class CdDefault3Component {
  constructor(public cdHelper: CdHelper) {}
}
