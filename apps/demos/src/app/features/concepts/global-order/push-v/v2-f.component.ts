import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { VisualizerComponent } from '../../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
import { RxLet } from '../../../../rx-angular-pocs/template/directives/let/rx-let.directive';
import { ValueDisplayComponent } from '../shared/value-display.component';
import { V2HComponent } from './v2-h.component';

@Component({
  selector: 'rxa-v2-f',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>F<small>v2</small></h1>
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
            <rxa-v2-h> </rxa-v2-h>
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VisualizerComponent, RxLet, ValueDisplayComponent, V2HComponent],
})
export class V2FComponent {
  constructor(public data: DataService) {}
}
