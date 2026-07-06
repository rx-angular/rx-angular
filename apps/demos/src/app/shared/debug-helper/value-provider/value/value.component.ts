import { Component, Input } from '@angular/core';
import { isObservable, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RxState } from '@rx-angular/state';
import { toBoolean } from '../utils';
import { TestItem } from '../model';
import { RxLet } from '../../../../../../../../libs/template/let/src/lib/let.directive';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'rxa-value',
  template: ` <mat-icon
    class="item"
    [ngClass]="{ red: !v, green: v }"
    *rxLet="value$; let v"
    >{{ v ? 'check' : 'highlight_off' }}</mat-icon
  >`,
  styles: [
    `
      .item.red {
        color: red;
      }
      .item.green {
        color: green;
      }
      .value.number {
      }
      .value.string {
      }
      .value.object {
      }
      .value.array {
      }
    `,
  ],
  providers: [RxState],
  imports: [RxLet, MatIcon, NgClass],
})
export class ValueComponent {
  value$ = this.state.select(map((s) => toBoolean(s.item.value, 0.5)));

  @Input()
  set value(o: Observable<TestItem> | TestItem) {
    this.state.connect('item', isObservable(o) ? o : of(o));
  }

  constructor(public state: RxState<{ item: TestItem }>) {}
}
