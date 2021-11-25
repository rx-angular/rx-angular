import { EMPTY, Observable, Subject, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RxState, selectSlice } from '@rx-angular/state';
import { CounterState, INITIAL_STATE } from '../shared/model';
import { toLatestFrom } from '../../../../shared/utils/to-latest-from';
import { updateCount } from '../shared/utils';

@Injectable()
export class CounterPresenterService extends RxState<CounterState> {
  private readonly countChangeSubject = new Subject<number>();
  private readonly tickSpeedChangeSubject = new Subject<number>();
  private readonly countDiffChangeSubject = new Subject<number>();
  private readonly isTickingToggleSubject = new Subject<boolean>();
  private readonly countUpToggleSubject = new Subject<boolean>();
  private readonly setToClickSubject = new Subject<Event>();
  private readonly updateCountTrigger$ = this.select(
    selectSlice(['isTicking', 'tickSpeed']),
    switchMap(s => (s.isTicking ? timer(0, s.tickSpeed) : EMPTY))
  );

  initialCounterState = INITIAL_STATE;

  readonly count$: Observable<string> = this.select(map(s => s.count + ''));
  readonly tickSpeed$: Observable<string> = this.select(map(s => s.tickSpeed + ''));
  readonly countDiff$: Observable<string> = this.select(map(s => s.countDiff + ''));

  constructor() {
    super();
    this.connect('isTicking', this.isTickingToggleSubject);
    this.connect('countUp', this.countUpToggleSubject);
    this.connect('countDiff', this.countDiffChangeSubject);
    this.connect('tickSpeed', this.tickSpeedChangeSubject);
    this.connect('count', this.setToClickSubject.pipe(toLatestFrom(this.countChangeSubject)));
    this.connect('count', this.updateCountTrigger$, updateCount);
  }

  reset() {
    this.set(this.initialCounterState);
  }

  setToClick() {
    this.countChangeSubject.next(undefined);
  }

  changeTickSpeed(tickSpeed: string) {
    this.tickSpeedChangeSubject.next(parseInt(tickSpeed, 10));
  }

  changeCountDiff(countDiff: string) {
    this.tickSpeedChangeSubject.next(parseInt(countDiff, 10));
  }

  changeCount(count: string) {
    this.countChangeSubject.next(parseInt(count, 10));
  }

  doTick() {
    this.isTickingToggleSubject.next(true);
  }

  dontTick() {
    this.isTickingToggleSubject.next(false);
  }

  countUp() {
    this.countUpToggleSubject.next(true);
  }

  countDown() {
    this.countUpToggleSubject.next(false);
  }

}


