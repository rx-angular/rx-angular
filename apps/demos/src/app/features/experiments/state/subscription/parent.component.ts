import { Component, OnDestroy } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { SourceService } from './source.service';
import { SubscriptionHandlingService } from './subscription.service';

@Component({
  selector: 'rxa-state-parent-subscription',
  template: `
    <h2>Subscription Handling</h2>
    <div class="case-content">Process running internally</div>
  `,
  changeDetection: environment.changeDetection,
  providers: [SubscriptionHandlingService]
})
export class RxStateParentSubscriptionComponent implements OnDestroy {
  subscription = new Subscription();
  onDestroy$ = new Subject<void>();

  process1$ = this.source.$.pipe(
    tap((num) => {
      console.log('New value: ', num);
    })
  );

  constructor(
    private source: SourceService,
    private subs: SubscriptionHandlingService
  ) {
    this.process1$.pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
