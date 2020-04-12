import { merge, Subject, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { DemoBasicsBaseModel } from './demo-basics5.base-model.interface';
import { DemoBasicsView } from './demo-basics4.view.interface';
import { RxState } from 'ngx-rx-state';

const initState: DemoBasicsBaseModel = {
  refreshInterval: 1000,
  listExpanded: true,
  isPending: true,
  list: []
};

@Injectable()
export class DemoBasics4ViewModelService extends RxState<DemoBasicsBaseModel>
  implements DemoBasicsView {
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
