import {
  ChangeDetectionStrategy,
  Component,
  effect,
  viewChild,
  ViewChild,
  viewChildren,
  ViewChildren,
} from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { ContentChildComponent } from './content-child.component';
import { ViewChildComponent } from './view-child.component';
import { RxActionFactory, rxActions } from '@rx-angular/state/actions';

@Component({
  selector: 'rxa-projected-views',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>Parent</h2>
        <button
          mat-raised-button
          [unpatch]="['click']"
          (click)="ui.trigger($event.timeStamp)"
        >
          tick
        </button>
      </div>
      <!--<rxa-strategy-select></rxa-strategy-select>-->
      test1
      <rxa-view-child>
        <div>
          <div *rxLet="renderCallback$; let renderCbVal; parent: false">
            renderCallback: {{ renderCbVal }}
          </div>
          <div
            *rxLet="
              ui.trigger$;
              renderCallback: renderCallback$;
              let value;
              parent: false
            "
          >
            <rxa-content-child>
              <div #test>{{ value }}</div>
            </rxa-content-child>
          </div>
          <!--
          <div *rxFor="ui.trigger$; let value; parent: true">
            <rxa-content-child>
              <div #test>{{ value }}</div>
            </rxa-content-child>
          </div>
          -->
        </div>
      </rxa-view-child>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectedViewsComponent {
  @ViewChildren('test') set testDif(t) {
    console.log('ViewChild in ProjectedViewsComponent of type div', t);
    // this thing will never fire
  }

  test = viewChildren('test');
  viewChildComponent = viewChild(ViewChildComponent);
  contentChildComponent = viewChild(ContentChildComponent);

  constructor() {
    effect(() => {
      console.log(
        'ViewChild in ProjectedViewsComponent of type ContentChildComponent: ',
        this.contentChildComponent(),
      );
    });
    effect(() => {
      console.log(
        'ViewChild in ProjectedViewsComponent of type ViewChildComponent: ',
        this.viewChildComponent(),
      );
    });
    effect(() => {
      console.log(
        'ViewChild in ProjectedViewsComponent of type div: ',
        this.test(),
      );
    });
  }

  ui = rxActions<{ trigger: number }>();
  renderCallback$ = new Subject<any>();

  triggerArr$ = combineLatest([this.ui.trigger$]);
}
