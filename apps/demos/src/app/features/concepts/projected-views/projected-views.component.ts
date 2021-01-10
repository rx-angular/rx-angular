import { ChangeDetectionStrategy, Component, ContentChild, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ContentChildComponent } from './content-child.component';
import { ViewChildComponent } from './view-child.component';


@Component({
  selector: 'rxa-projected-views',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>Parent</h2>
        <button mat-raised-button [unpatch] (click)="trigger$.next($event.timeStamp)">tick</button>
      </div>
      test1
      <rxa-view-child>
        test2
        <rxa-content-child *rxLet="trigger$;let value">
            {{value}}
        </rxa-content-child>
      </rxa-view-child>

    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectedViewsComponent {
  @ViewChild(ViewChildComponent)
  set vcVc(v) {
    console.log('ViewChild in ProjectedViewsComponent of type ViewChildComponent: ', v)
  }
  @ViewChild(ContentChildComponent)
  set vcCc(v) {
    console.log('ViewChild in ProjectedViewsComponent of type ContentChildComponent: ', v)
  };

  trigger$ = new Subject<any>();
}
