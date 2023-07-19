import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { merge, Subject, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface ComponentState {
  refreshInterval: number;
  list: DemoBasicsItem[];
  listExpanded: boolean;
}
export interface DemoBasicsItem {
  id: string;
  name: string;
}

const initComponentState = {
  refreshInterval: 10000,
  listExpanded: false,
  list: [],
};

@Injectable()
export class Presenter extends RxState<ComponentState> {
  refreshClicks = new Subject<Event>();
  listExpandedChanges = new Subject<boolean>();

  vm$ = this.select();

  refreshListTrigger$ = merge(
    this.refreshClicks,
    this.select(
      map((s) => s.refreshInterval),
      switchMap((ms) => timer(0, ms))
    )
  )

  constructor() {
    super();
    this.set(initComponentState);
    this.connect(
      this.listExpandedChanges.pipe(map((b) => ({ listExpanded: b })))
    );
  }

}
