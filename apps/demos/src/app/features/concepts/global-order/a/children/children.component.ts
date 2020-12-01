import { AfterContentInit, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { CComponent } from '../c/c.component';

@Component({
  selector: 'rxa-children',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Component C (Child)</h1>
      </ng-container>
      <div class="row">
        <div class="col">
          <ng-content></ng-content>
        </div>
      </div>
    </rxa-visualizer>
  `,
  styles: [
  ]
})
export class ChildrenComponent implements AfterContentInit {

  @ContentChildren(CComponent) childComponents: QueryList<CComponent>;

  constructor() { }

  ngAfterContentInit() {
    this.childComponents.changes.subscribe(console.log);
  }

}
