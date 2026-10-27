import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RxLet } from '../../../../rx-angular-pocs/template/directives/let/rx-let.directive';
import { VisualizerComponent } from '../../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
import { DataService } from '../shared/data.service';
import { ValueDisplayComponent } from '../shared/value-display.component';
import { V3EComponent } from './v3-e.component';
import { V3FComponent } from './v3-f.component';

@Component({
  selector: 'rxa-v3-c',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>C<small>v3</small></h1>
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
            <rxa-v3-e> </rxa-v3-e>
          </div>
          <div class="col">
            <rxa-v3-f> </rxa-v3-f>
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
    V3EComponent,
    V3FComponent,
  ],
})
export class V3CComponent {
  constructor(public data: DataService) {}
}
