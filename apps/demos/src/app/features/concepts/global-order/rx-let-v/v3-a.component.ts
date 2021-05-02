import { ChangeDetectionStrategy, Component } from '@angular/core';import { DataService } from '../shared/data.service';

@Component({
  selector: 'rxa-v3-a',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>A<small>v3</small></h1>
        <span *rxLet="data.count$; let v">
          <rxa-dirty-check></rxa-dirty-check>
          count: {{v}}
        </span>
      </div>
      <div class="row w-100">
        <div class="col">
          <rxa-v3-b [value]="data.count$" (valueChange)="data.increment($event)">
          </rxa-v3-b>
        </div>
        <div class="col">
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }, changeDetection: ChangeDetectionStrategy.OnPush
})
export class V3AComponent {

  constructor(public data: DataService) {
  }

}
