import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'rxa-v2-h',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>H<small>v2</small></h1>
      </div>
      <div class="row w-100">
        <rxa-value-display *rxLet="data.count$ let count" class="col" [value]="count"></rxa-value-display>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }
})
export class V2HComponent {

  constructor(public data: DataService) {
  }

}
