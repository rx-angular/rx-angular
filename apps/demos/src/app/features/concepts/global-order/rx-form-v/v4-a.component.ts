import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { VisualizerComponent } from '../../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
import { RxLet } from '../../../../rx-angular-pocs/template/directives/let/rx-let.directive';
import { DirtyChecksComponent } from '../../../../shared/debug-helper/dirty-checks/dirty-checks.component';
import { V4BComponent } from './v4-b.component';

@Component({
  selector: 'rxa-v4-a',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>A<small>v4</small></h1>
        <span *rxLet="data.count$; let v">
          <rxa-dirty-check></rxa-dirty-check>
          count: {{ v }}
        </span>
      </div>
      <div class="row w-100">
        <div class="col">
          <rxa-v4-b> </rxa-v4-b>
        </div>
        <div class="col"></div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VisualizerComponent, RxLet, DirtyChecksComponent, V4BComponent],
})
export class V4AComponent {
  constructor(public data: DataService) {}
}
