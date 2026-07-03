import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VisualizerComponent } from '../../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
@Component({
  selector: 'rxa-v4-d',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>D<small>v4</small></h1>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VisualizerComponent],
})
export class V4DComponent {
  constructor() {}
}
