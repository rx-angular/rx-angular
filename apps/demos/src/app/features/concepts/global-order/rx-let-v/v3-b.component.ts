import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { VisualizerComponent } from '../../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
import { MatButton } from '@angular/material/button';
import { UnpatchEventsDirective } from '../../../../rx-angular-pocs/template/directives/unpatch/unpatch-events.directive';
import { RxLet } from '../../../../rx-angular-pocs/template/directives/let/rx-let.directive';
import { DirtyChecksComponent } from '../../../../shared/debug-helper/dirty-checks/dirty-checks.component';

@Component({
  selector: 'rxa-v3-b',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>B<small>v3</small></h1>
      </div>
      <div class="row w-100">
        <div class="col">
          <button [unpatch] mat-raised-button (click)="valueChange.next(1)">
            increment
          </button>
          <span *rxLet="value; let v">
            <rxa-dirty-check></rxa-dirty-check>
            count: {{ v }}
          </span>
        </div>
      </div>
      <div class="row w-100">
        <div class="col"></div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    VisualizerComponent,
    MatButton,
    UnpatchEventsDirective,
    RxLet,
    DirtyChecksComponent,
  ],
})
export class V3BComponent {
  @Input()
  value;

  @Output()
  valueChange = new Subject<number>();

  constructor() {}
}
