import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'rxa-v3-e',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>E<small>v3</small></h1>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class V3EComponent {
  constructor() {}
}
