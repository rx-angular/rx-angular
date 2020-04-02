import { Injectable, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {RxState as BaseRxState} from '@rxjs-state';

@Injectable({providedIn: 'root'})
export class RxGlobalState<T> extends BaseRxState<T> implements OnDestroy {
  subscription = new Subscription();

  constructor() {
    super();
    this.subscription.add(this.subscribe());
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
