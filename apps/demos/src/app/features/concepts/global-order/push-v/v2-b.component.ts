import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'rxa-v2-b',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>B<small>v2</small></h1>
      </div>
      <div class="row w-100">
        <div class="col">
          <button [unpatch] mat-raised-button (click)="valueChange.next(1)">increment</button>
          <span>count: {{value | push}}</span>
        </div>
      </div>
      <div class="row w-100">
        <div class="col">
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }, changeDetection: ChangeDetectionStrategy.OnPush
})
export class V2BComponent {

  @Input()
  value

  @Output()
  valueChange = new Subject<number>();

  constructor() {
  }

}
