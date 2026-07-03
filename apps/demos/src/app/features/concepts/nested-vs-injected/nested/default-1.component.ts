import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdHelper } from '../../../../shared/utils/cd-helper';
import { VisualizerComponent } from '../../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
import { CdTriggerComponent } from '../../../../shared/debug-helper/cd-trigger/cd-trigger/cd-trigger.component';
import { CdDefault2Component } from './default-2.component';
import { CdOnPush3Component } from './push-3.component';

@Component({
  selector: 'rxa-cd-default-1',
  template: ` <rxa-visualizer>
    <ng-container visualizerHeader>
      <h3>Default</h3>
      <rxa-cd-trigger [cdHelper]="cdHelper"></rxa-cd-trigger>
      <ng-content select="[cdDefaultHeader]"></ng-content>
    </ng-container>
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <rxa-cd-default-2> </rxa-cd-default-2>
      </div>
      <div class="col-sm-12 col-md-6">
        <rxa-cd-push-3> </rxa-cd-push-3>
      </div>
    </div>
  </rxa-visualizer>`,
  host: {
    class: 'd-block w-100',
  },
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [CdHelper],
  imports: [
    VisualizerComponent,
    CdTriggerComponent,
    CdDefault2Component,
    CdOnPush3Component,
  ],
})
export class CdDefault1Component {
  constructor(public cdHelper: CdHelper) {}
}
