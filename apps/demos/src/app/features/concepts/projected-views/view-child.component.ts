import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild } from '@angular/core';
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

  _renders = 0;

  renders() {
    return this._renders++;
  }

  @ContentChild(ContentChildComponent)
  set cc(v) {
    console.log('ContentChild in ViewChildComponent of type ContentChildComponent: ', v)
  };


  constructor(private cdRef: ChangeDetectorRef) {}

}
