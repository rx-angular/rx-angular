import { Component } from '@angular/core';
import { RxState } from '@ngx-rx-state';

import { distinctUntilChanged, mapTo, switchMap, tap } from 'rxjs/operators';
import { interval, NEVER } from 'rxjs';

export interface CountState {
  isCounting: boolean;
  countingUp: boolean;
  count: number;
  countDiff: number;
  countSpeed: number;
}

@Component({
  selector: 'ng-demo',
  template: `
    <div *ngIf="state$ | async as state">
      <h2>Count: {{ state.count }}</h2>
      <label>
        Count Diff
        <input
          type="number"
          [value]="state.countDiff"
          (change)="countUpdateCountDiff($event.target.value)"
          (keyup)="countUpdateCountDiff($event.target.value)"
        /> </label
      ><br />
      <label>
        Count Speed
        <input
          type="number"
          [value]="state.countSpeed"
          (change)="countUpdateCountSpeed($event.target.value)"
          (keyup)="countUpdateCountSpeed($event.target.value)"
        /> </label
      ><br />
      <label>
        Set Count
        <input
          type="number"
          value="10"
          (change)="countUpdateCount($event.target.value)"
          (keyup)="countUpdateCount($event.target.value)"
        />
      </label>
    </div>

    <button (click)="countCountUp()">start up</button>
    <button (click)="countCountDown()">start down</button>
    <button (click)="countPause()">pause</button>
    <button (click)="countReset()">reset</button>
    <button (click)="countAdd()">add</button>
    <button (click)="countSubtract()">sub</button>
  `,
  providers: [RxState]
})
export class NgDemoComponent {
  initialState: CountState = {
    isCounting: false,
    countingUp: true,
    count: 0,
    countDiff: 1,
    countSpeed: 500
  };

  private timerCount$ = this.state.select().pipe(
    distinctUntilChanged(
      (x, y) =>
        x.countingUp === y.countingUp &&
        x.countSpeed === y.countSpeed &&
        x.isCounting === y.isCounting
    ),
    switchMap(({ countSpeed, countingUp, isCounting }) =>
      isCounting ? interval(countSpeed).pipe(mapTo(countingUp)) : NEVER
    ),
    tap(countingUp => (countingUp ? this.countAdd() : this.countSubtract()))
  );

  state$ = this.state.select();

  constructor(public state: RxState<CountState>) {
    this.state.setState(this.initialState);
    state.hold(this.timerCount$);
    this.countReset();
  }

  countAdd() {
    this.state.setState(state => ({ count: state.count + state.countDiff }));
  }

  countSubtract() {
    this.state.setState(state => ({ count: state.count - state.countDiff }));
  }

  countUpdateCount(value) {
    this.state.setState({ count: parseInt(value) });
  }

  countUpdateCountDiff(value) {
    this.state.setState({ countDiff: parseInt(value) });
  }

  countUpdateCountSpeed(value) {
    this.state.setState({ countSpeed: parseInt(value) });
  }

  countCountUp() {
    this.state.setState({ countingUp: true, isCounting: true });
  }

  countCountDown() {
    this.state.setState({ countingUp: false, isCounting: true });
  }

  countPause() {
    this.state.setState({ isCounting: false });
  }

  countReset() {
    this.state.setState(this.initialState);
  }
}
