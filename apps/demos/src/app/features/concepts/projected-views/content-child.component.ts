import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VisualizerComponent } from '../../../shared/debug-helper/visualizer/visualizer/visualizer.component';

@Component({
  selector: 'rxa-content-child',
  template: `
    <rxa-visualizer>
      <h2 visualizerHeader>ContentChild</h2>
      <ng-content></ng-content>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VisualizerComponent],
})
export class ContentChildComponent {}
