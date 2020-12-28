import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { RX_CUSTOM_STRATEGIES, RX_PRIMARY_STRATEGY } from '../../../../../rx-angular-pocs/render-strategies';
import { getPartialTreeCredentials } from './partial-tree.strategy';

@Component({
  selector: 'rxa-v3-a',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>A<small>v3</small></h1>
        <button [unpatch] mat-raised-button (click)="data.increment(1)">decrement</button>
        <button [unpatch] mat-raised-button (click)="data.decrement(1)">increment</button>
        <span *rxLet="data.count$; let count">count: {{count}}</span>
      </div>
      <div class="row w-100">
        <div class="col">
          <rxa-v3-b></rxa-v3-b>
        </div>
        <div class="col">
          <rxa-v3-c></rxa-v3-c>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: RX_PRIMARY_STRATEGY,
      useValue: 'partialTree2'
    },
    {
      provide: RX_CUSTOM_STRATEGIES,
      useValue: { partialTree2: getPartialTreeCredentials(undefined) },
      multi: true
    },
    DataService
  ]
})
export class V3AComponent {

  constructor(public data: DataService) {
    setTimeout(() => {
      this.data.increment(3);

      setTimeout(() => {
        this.data.increment(5);
      }, 2000);
    }, 2000);
  }
}
