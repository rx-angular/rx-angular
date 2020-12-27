import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'rxa-v1-h',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>H<small>v1</small></h1>
      </div>
      <div class="row w-100">
        <rxa-value-display [value]="data.count$ | async"></rxa-value-display>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }
})
export class V1HComponent {

  constructor(public data: DataService) {
  }

}
