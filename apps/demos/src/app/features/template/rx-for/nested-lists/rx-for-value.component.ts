import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RxState } from '@rx-angular/state';
import { RxLet } from '@rx-angular/template/let';
import { isObservable, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import {
  TestItem,
  toBoolean,
} from '../../../../shared/debug-helper/value-provider';

@Component({
  selector: 'rxa-rx-for-value',
  standalone: true,
  imports: [MatIconModule, RxLet, DirtyChecksModule],
  template: `
    <ng-container
      *rxLet="
        value$;
        let v;
        strategy: strategy$;
        parent: false;
        patchZone: false
      "
    >
      <mat-icon class="item" [class.red]="!v" [class.green]="v">
        {{ v ? 'check' : 'highlight_off' }}
      </mat-icon>
      <rxa-dirty-check></rxa-dirty-check>
    </ng-container>
  `,
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
  host: {
    class:
      'd-flex justify-content-center align-items-center flex-column w-100 m-1 p-1 dh-embedded-view',
  },
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxForValueComponent {
  readonly state = inject<RxState<{ item: TestItem }>>(RxState);

  value$ = this.state.select(map((s) => toBoolean(s.item.value, 0.5)));

  @Input()
  set value(o: Observable<TestItem> | TestItem) {
    this.state.connect('item', isObservable(o) ? o : of(o));
  }
  @Input()
  strategy$: Observable<string>;
}
