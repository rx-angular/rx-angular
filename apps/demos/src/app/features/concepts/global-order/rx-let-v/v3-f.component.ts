import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RxLet } from '../../../../rx-angular-pocs/template/directives/let/rx-let.directive';
import { VisualizerComponent } from '../../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
import { DataService } from '../shared/data.service';
import { ValueDisplayComponent } from '../shared/value-display.component';
import { V3HComponent } from './v3-h.component';

@Component({
  selector: 'rxa-v3-f',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>F<small>v3</small></h1>
      </div>
      <div class=" w-100">
        <div class="row">
          <div class="col">
            <rxa-value-display
              *rxLet="data.count$; let count"
              class="col"
              [value]="count"
            ></rxa-value-display>
          </div>
        </div>
        <div class="row w-100">
          <div class="col">
            <rxa-v3-h> </rxa-v3-h>
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VisualizerComponent, RxLet, ValueDisplayComponent, V3HComponent],
})
export class V3FComponent {
  constructor(public data: DataService) {}
}
