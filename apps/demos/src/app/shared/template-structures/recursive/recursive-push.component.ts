import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxPush } from '@rx-angular/template/push';
import { ReplaySubject } from 'rxjs';
import { PushPipe } from '../../../rx-angular-pocs/template/pipes/push/push.pipe';
import { RenderingsComponent } from '../../debug-helper/renderings/renderings.component';
import { VisualizerComponent } from '../../debug-helper/visualizer/visualizer/visualizer.component';

@Component({
  selector: 'rxa-recursive-push',
  template: `
    @if (level === 0) {
      <rxa-visualizer>
        <p visualizerHeader>Level {{ total - level }}</p>
        <rxa-renders [value$]="value$ | push"></rxa-renders>
      </rxa-visualizer>
    } @else {
      <rxa-visualizer>
        <p visualizerHeader>Level {{ total - level }}</p>
        <rxa-recursive-push
          [total]="total"
          [level]="level - 1"
          [value]="value$ | push"
        ></rxa-recursive-push>
      </rxa-visualizer>
    }
  `,
  host: {
    class: 'd-flex w-100',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    VisualizerComponent,
    RenderingsComponent,
    RecursivePushComponent,
    RxPush,
    PushPipe,
  ],
})
export class RecursivePushComponent {
  @Input()
  set depth(d) {
    this.total = d;
    this.level = this.total - 1;
  }

  @Input()
  total = 0;

  @Input()
  level = 0;

  value$ = new ReplaySubject(1);

  @Input()
  set value(v) {
    this.value$.next(v);
  }
}
