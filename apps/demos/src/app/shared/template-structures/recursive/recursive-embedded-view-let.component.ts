import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'rxa-recursive-embedded-view-let',
  template: `
    <ng-container *ngIf="level === 0; else: branch">
      <rxa-visualizer>
        <p visualizerHeader>Level {{total - level}}</p>
        <rxa-renders *poc1Let="value$; let v" [value$]="v"></rxa-renders>
      </rxa-visualizer>
    </ng-container>
    <ng-template #branch>
      <rxa-visualizer>
        <p visualizerHeader>Level {{total - level}}</p>
        <rxa-recursive-embedded-view-let [total]="total" *poc1Let="value$; let v" [level]="level-1"
                                         [value]="v"></rxa-recursive-embedded-view-let>
      </rxa-visualizer>
    </ng-template>
  `,
  host: {
    class: 'd-flex w-100'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecursiveEmbeddedViewLetComponent {
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
  };

}
