import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { VisualizerComponent } from '../../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
import { V1EComponent } from './v1-e.component';
import { V1FComponent } from './v1-f.component';

@Component({
  selector: 'rxa-v1-c',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>C<small>v1</small></h1>
      </div>
      <div class=" w-100">
        <div class="row"></div>
        <div class="row">
          <div class="col">
            <rxa-v1-e> </rxa-v1-e>
          </div>
          <div class="col">
            <rxa-v1-f> </rxa-v1-f>
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VisualizerComponent, V1EComponent, V1FComponent],
})
export class V1CComponent {
  constructor(public data: DataService) {}
}
