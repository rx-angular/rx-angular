import { Component } from '@angular/core';

@Component({
  selector: 'rxa-v2-e',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>E<small>v2</small></h1>
      </div>

    </rxa-visualizer>
  `,
  host: { class: 'w-100' }
})
export class V2EComponent {

  constructor() {
  }

}
