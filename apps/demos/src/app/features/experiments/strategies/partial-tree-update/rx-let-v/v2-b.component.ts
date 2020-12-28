import { ChangeDetectionStrategy, Component } from '@angular/core';@Component({
  selector: 'rxa-v2-b',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>B<small>v2</small></h1>
      </div>
      <div class="row w-100">
        <div class="col">
        <rxa-v2-d>
        </rxa-v2-d>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }, changeDetection: ChangeDetectionStrategy.OnPush
})
export class V2BComponent {

  constructor() {
  }

}
