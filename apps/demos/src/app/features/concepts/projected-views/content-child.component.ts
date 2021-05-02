import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-content-child',
  template: `
    <rxa-visualizer>
      <h2 visualizerHeader>ContentChild</h2>
      <ng-content></ng-content>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentChildComponent {
}
