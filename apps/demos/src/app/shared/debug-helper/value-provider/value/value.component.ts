import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RxState } from '@rx-angular/state';
import { RxLet } from '@rx-angular/template/let';
import { isObservable, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestItem } from '../model';
import { toBoolean } from '../utils';

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
