import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RenderingsComponent } from '../../debug-helper/renderings/renderings.component';
import { VisualizerComponent } from '../../debug-helper/visualizer/visualizer/visualizer.component';

@Component({
  selector: 'rxa-recursive-static',
  template: `
    @if (level === 0) {
      <rxa-visualizer>
        <p visualizerHeader>Level {{ total - level }}</p>
        <rxa-renders [value$]="value"></rxa-renders>
      </rxa-visualizer>
    } @else {
      <rxa-visualizer>
        <p visualizerHeader>Level {{ total - level }}</p>
        <rxa-recursive-static
          [total]="total"
          [level]="level - 1"
          [value]="value"
        ></rxa-recursive-static>
      </rxa-visualizer>
    }
  `,
  host: {
    class: 'd-flex w-100',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VisualizerComponent, RenderingsComponent, RecursiveStaticComponent],
})
export class RecursiveStaticComponent {
  @Input()
  set depth(d) {
    this.total = d;
    this.level = this.total - 1;
  }

  @Input()
  total = 0;

  @Input()
  level = 0;

  @Input()
  value;
}
