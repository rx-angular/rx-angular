import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RxLet } from '../../../../rx-angular-pocs/template/directives/let/rx-let.directive';
import { VisualizerComponent } from '../../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
import { DataService } from '../shared/data.service';
import { ValueDisplayComponent } from '../shared/value-display.component';
import { V2EComponent } from './v2-e.component';
import { V2FComponent } from './v2-f.component';

@Component({
  selector: 'rxa-v2-c',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>C<small>v2</small></h1>
      </div>
      <div class=" w-100">
        <div class="row">
          <rxa-value-display
            *rxLet="data.count$; let count"
            class="col"
            [value]="count"
          ></rxa-value-display>
        </div>
        <div class="row">
          <div class="col">
            <rxa-v2-e> </rxa-v2-e>
          </div>
          <div class="col">
            <rxa-v2-f> </rxa-v2-f>
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    VisualizerComponent,
    RxLet,
    ValueDisplayComponent,
    V2EComponent,
    V2FComponent,
  ],
})
export class V2CComponent {
  constructor(public data: DataService) {}
}
