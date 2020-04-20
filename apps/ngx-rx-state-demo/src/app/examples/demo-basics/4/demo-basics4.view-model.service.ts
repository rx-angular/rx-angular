import { merge, Observable, Subject, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RxState } from 'ngx-rx-state';
import { DemoBasicsItem } from '../demo-basics-item.interface';

export interface DemoBasicsView {
  // All UI-Events or component EventBindings
  refreshClicks: Subject<Event>;
  listExpandedChanges: Subject<boolean>;
  // Optional The base model as observable
  baseModel$: Observable<DemoBasicsBaseModel>;
  // Optional Derivations as observable
  // ....
}

export interface DemoBasicsBaseModel {
  refreshInterval: number;
  list: DemoBasicsItem[];
  listExpanded: boolean;
  isPending: boolean;
}

const initState: DemoBasicsBaseModel = {
  refreshInterval: 1000,
  listExpanded: true,
  isPending: true,
  list: []
};

@Injectable()
export class DemoBasics4ViewModelService extends RxState<DemoBasicsBaseModel> {
  baseModel$ = this.select();

  // ListView =================================================
  refreshClicks = new Subject<Event>();
  listExpandedChanges = new Subject<boolean>();

  refreshListSideEffect$ = merge(
    this.refreshClicks,
    this.select(map(s => s.refreshInterval)).pipe(switchMap(ms => timer(ms)))
  );

  constructor() {
    super();
    this.setState(initState);

    this.connect(
      this.listExpandedChanges.pipe(map(b => ({ listExpanded: b })))
    );
  }
}
