import { ChangeDetectionStrategy, Component } from '@angular/core';import { DataService } from '../shared/data.service';

@Component({
  selector: 'rxa-v2-a',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>A<small>v2</small></h1>
        <rxa-dirty-check log="A"></rxa-dirty-check>
        <span>count: {{data.count$ | push}}</span>
      </div>
      <div class="row w-100">
        <div class="col">
          <rxa-v2-b [value]="data.count$" (valueChange)="data.increment($event)">
          </rxa-v2-b>
        </div>
        <div class="col">
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
