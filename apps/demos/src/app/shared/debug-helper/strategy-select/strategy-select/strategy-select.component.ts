import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { dictionaryToArray } from '@rx-angular/state';
import { RxEffects } from '../../../rx-effects.service';
import { RxChangeDetectorRef } from '../../../rx-change-detector-ref/rx-change-detector-ref.service';

@Component({
  selector: 'rxa-strategy-select',
  template: `
    <label>Current Strategy: {{strategy$ | push}}</label>
    <select (change)="changeStrategy$.next($event.target.value)" class="block">
      <option
        [value]="s.name"
        [selected]="(strategy$ | push) === s.name"
        *ngFor="let s of strategies$ | push">
        {{ s.name }}
      </option>
    </select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StrategySelectComponent {
  changeStrategy$ = new Subject<string>();
  strategy$ = this.rxCdRef.strategy$.pipe(map(s => s.name));
  strategies$ = this.rxCdRef.strategies$.pipe(map(s => dictionaryToArray(s)));

  constructor(
    private rxEffect: RxEffects,
    public rxCdRef: RxChangeDetectorRef
  ) {
    this.rxEffect.hold(this.changeStrategy$, st => this.rxCdRef.setStrategy(st));
  }

}
