import { ChangeDetectionStrategy, Component } from '@angular/core';@Component({
  selector: 'rxa-v3-d',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>D<small>v3</small></h1>
      </div>

    </rxa-visualizer>
  `,
  host: { class: 'w-100' }, changeDetection: ChangeDetectionStrategy.OnPush
})
export class V3DComponent {

  constructor() {
  }

}
