import { ChangeDetectionStrategy, Component } from '@angular/core';import { DataService } from '../shared/data.service';

@Component({
  selector: 'rxa-v2-a',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>A<small>v2</small></h1>
        <button [unpatch] mat-raised-button (click)="data.decrement(1)">decrement</button>
        <button [unpatch] mat-raised-button (click)="data.increment(1)">increment</button>
        <span *rxLet="data.count$; let count">count: {{count}}</span>
      </div>
      <div class="row w-100">
        <div class="col">
          <rxa-v2-b>
          </rxa-v2-b>
        </div>
        <div class="col">
          <rxa-v2-c>
          </rxa-v2-c>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }, changeDetection: ChangeDetectionStrategy.OnPush
})
export class V2AComponent {

  constructor(public data: DataService) {
  }

}
