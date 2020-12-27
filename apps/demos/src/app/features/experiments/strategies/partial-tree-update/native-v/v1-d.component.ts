import { Component } from '@angular/core';

@Component({
  selector: 'rxa-v1-d',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>D<small>v1</small></h1>
      </div>

    </rxa-visualizer>
  `,
  host: { class: 'w-100' }
})
export class V1DComponent {

  constructor() {
  }

}
