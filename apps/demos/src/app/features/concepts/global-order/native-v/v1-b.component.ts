import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';@Component({
  selector: 'rxa-v1-b',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>B<small>v1</small></h1>

      </div>
      <div class="row w-100">
        <div class="col">
          <button mat-raised-button (click)="valueChange.emit(42)">decrement</button>
          <span>count: {{value | async}}</span>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }, changeDetection: ChangeDetectionStrategy.OnPush
})
export class V1BComponent {

  @Input()
  value

  @Output()
  valueChange = new EventEmitter();

}
