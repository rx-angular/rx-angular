import { ChangeDetectionStrategy, Component } from '@angular/core';import { DataService } from '../shared/data.service';

@Component({
  selector: 'rxa-v1-a',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>A<small>v1</small></h1>
        <span>count: {{data.count$ | async}}</span>
      </div>
      <div class="row w-100">
        <div class="col">
          <rxa-v1-b [value]="data.count$" (valueChange)="data.increment($event)">
          </rxa-v1-b>
        </div>
        <div class="col">
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }, changeDetection: ChangeDetectionStrategy.OnPush
})
export class V1AComponent {

  constructor(public data: DataService) {
  }

}
