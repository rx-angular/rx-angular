import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RxPush } from '@rx-angular/template/push';
import { PushPipe } from '../../../../rx-angular-pocs/template/pipes/push/push.pipe';
import { DirtyChecksComponent } from '../../../../shared/debug-helper/dirty-checks/dirty-checks.component';
import { VisualizerComponent } from '../../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
import { DataService } from '../shared/data.service';
import { V2BComponent } from './v2-b.component';

@Component({
  selector: 'rxa-v2-a',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>A<small>v2</small></h1>
        <rxa-dirty-check log="A"></rxa-dirty-check>
        <span>count: {{ data.count$ | push }}</span>
      </div>
      <div class="row w-100">
        <div class="col">
          <rxa-v2-b
            [value]="data.count$"
            (valueChange)="data.increment($event)"
          >
          </rxa-v2-b>
        </div>
        <div class="col"></div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    VisualizerComponent,
    DirtyChecksComponent,
    V2BComponent,
    PushPipe,
    RxPush,
  ],
})
export class V2AComponent {
  constructor(public data: DataService) {}
}
