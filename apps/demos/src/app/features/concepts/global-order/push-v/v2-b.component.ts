import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'rxa-v2-b',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>B<small>v2</small></h1>
        <div class="d-flex">
          <rxa-dirty-check *ngFor="let i of numExpressions"></rxa-dirty-check>
        </div>
      </div>
      <div class="row w-100">
        <div class="col">
          <button [unpatch] mat-raised-button (click)="l('click in B'); valueChange.next(1);">increment</button>
          <span>count: {{value | push}}</span>
        </div>
      </div>
      <div class="row w-100">
        <div class="col">
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }, changeDetection: ChangeDetectionStrategy.OnPush
})
export class V2BComponent {

  numExpressions = new Array(1).fill(0);

  value;
  @Input('value')
  set _value(v$: Observable<number>) {
    this.l('input of B', v$);
    this.value = v$.pipe(tap(v => console.log('value change in B', v)));
  }

  @Output()
  valueChange = new Subject<number>();

  l(m: string, v?: any) {
    if(v !== undefined) {
      console.log(m, v);
    } else {
      console.log(m);
    }
  }

}
