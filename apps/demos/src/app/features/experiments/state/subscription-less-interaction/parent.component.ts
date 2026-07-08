import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { SourceService } from './source.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

interface ComponentState {
  title: string;
  value: number;
}

@Component({
  selector: 'rxa-state-parent-subscription-less-interaction',
  template: `
    <h2>Subscription Less interaction</h2>
    <div class="case-content">
      state:
      <pre>{{ state$ | async | json }}</pre>
    </div>
  `,
  changeDetection: environment.changeDetection,
  imports: [AsyncPipe, JsonPipe],
})
export class RxStateParentSubscriptionLessComponent implements OnDestroy {
  subscription = new Subscription();
  stateSources$ = new Subject();

  state$ = this.stateSources$.pipe(
    scan(
      (state: ComponentState, slices: Partial<ComponentState>) => ({
        ...state,
        ...slices,
      }),
      {},
    ),
  );

  source1$ = this.source.$.pipe(map((v) => ({ value: v })));

  constructor(private source: SourceService) {
    this.subscription = this.source1$.subscribe((v) => {
      this.stateSources$.next(v);
    });
  }

  /*
    (this.state$ as any).connect();
    this.stateSources$.next(this.source1$.pipe(tap(console.log)));

   state$ = this.stateSources$.pipe(
    map(o => isObservable(o) ? o : of(o)),
    mergeAll(),
    scan((state: ComponentState, slices: Partial<ComponentState>) => ({...state, ...slices}), {}),
    publishReplay(1)
  );
  */

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
