import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { VisualizerComponent } from '../../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
import { ValueDisplayComponent } from '../shared/value-display.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'rxa-v1-h',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>H<small>v1</small></h1>
      </div>
      <div class="row w-100">
        <rxa-value-display [value]="data.count$ | async"></rxa-value-display>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VisualizerComponent, ValueDisplayComponent, AsyncPipe],
})
export class V1HComponent {
  constructor(public data: DataService) {}
}
