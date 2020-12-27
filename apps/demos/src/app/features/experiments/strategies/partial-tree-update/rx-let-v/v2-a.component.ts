import { Component } from '@angular/core';

@Component({
  selector: 'rxa-v2-a',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>A<small>v2</small></h1>
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
  host: { class: 'w-100' }
})
export class V2AComponent {

  constructor() {
  }

}
