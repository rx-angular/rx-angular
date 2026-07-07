import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { VisualizerComponent } from '../../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
import { V1BComponent } from './v1-b.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'rxa-v1-a',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>A<small>v1</small></h1>
        <span>count: {{ data.count$ | async }}</span>
      </div>
      <div class="row w-100">
        <div class="col">
          <rxa-v1-b
            [value]="data.count$"
            (valueChange)="data.increment($event)"
          >
          </rxa-v1-b>
        </div>
        <div class="col"></div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VisualizerComponent, V1BComponent, AsyncPipe],
})
export class V1AComponent {
  constructor(public data: DataService) {}
}
