import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { RenderingsComponent } from '../../debug-helper/renderings/renderings.component';
import { VisualizerComponent } from '../../debug-helper/visualizer/visualizer/visualizer.component';

@Component({
  selector: 'rxa-recursive-async',
  template: `
    @if (level === 0) {
      <rxa-visualizer>
        <p visualizerHeader>Level {{ total - level }}</p>
        <rxa-renders [value$]="value$ | async"></rxa-renders>
      </rxa-visualizer>
    } @else {
      <rxa-visualizer>
        <p visualizerHeader>Level {{ total - level }}</p>
        <rxa-recursive-async
          [total]="total"
          [level]="level - 1"
          [value]="value$ | async"
        ></rxa-recursive-async>
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
    RecursiveAsyncComponent,
    AsyncPipe,
  ],
})
export class RecursiveAsyncComponent {
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
