import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { mergeAll, takeUntil } from 'rxjs/operators';

@Injectable()
export class SubscriptionHandlingService implements OnDestroy {
  subscription = new Subscription();
  processes$ = new Subject();

  constructor() {
    this.subscription.add(this.processes$.pipe(mergeAll()).subscribe());
  }

  hold(o$: Observable<any>): void {
    this.processes$.next(o$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
