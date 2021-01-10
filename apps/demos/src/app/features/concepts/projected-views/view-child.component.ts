import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild } from '@angular/core';
import { ContentChildComponent } from './content-child.component';

@Component({
  selector: 'rxa-view-child',
  template: `
    <rxa-visualizer>
      <h2 visualizerHeader>ViewChild</h2>
      <ng-content></ng-content>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewChildComponent {
  @ContentChild(ContentChildComponent)
  set cc(v) {
    console.log('ContentChild: ', v)
  };

}
