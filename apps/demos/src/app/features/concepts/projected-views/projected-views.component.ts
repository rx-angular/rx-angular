import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { ContentChildComponent } from './content-child.component';
import { ViewChildComponent } from './view-child.component';
import { RxActionFactory } from '@rx-angular/state/actions';

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
          <div
            *rxLet="
              renderCallback$;
              let renderCbVal;
              parent: false;
              patchZone: false
            "
          >
            renderCallback: {{ renderCbVal }}
          </div>
          <div
            *rxLet="
              ui.trigger$;
              renderCallback: renderCallback$;
              let value;
              parent: true;
              patchZone: false
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
  providers: [RxActionFactory],
})
export class ProjectedViewsComponent {
  @ViewChildren('test') set test(t) {
    console.log('ViewChild in ProjectedViewsComponent of type div', t);
  }

  @ViewChild(ViewChildComponent)
  set vcVc(v) {
    console.log(
      'ViewChild in ProjectedViewsComponent of type ViewChildComponent: ',
      v
    );
  }

  @ViewChild(ContentChildComponent)
  set vcCc(v) {
    console.log(
      'ViewChild in ProjectedViewsComponent of type ContentChildComponent: ',
      v
    );
  }

  constructor(private actions: RxActionFactory<{ trigger: number }>) {}

  ui = this.actions.create();
  renderCallback$ = new Subject<any>();

  triggerArr$ = combineLatest([this.ui.trigger$]);
}
