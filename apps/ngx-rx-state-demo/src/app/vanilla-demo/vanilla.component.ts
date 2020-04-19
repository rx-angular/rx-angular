import { Component, OnDestroy } from '@angular/core';
import { RxJsState } from '@ngx-rx/rxjs-state';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vanilla-demo',
  template: `
    vanilla-demo: {{ value$ | async | json }}
  `
})
export class VanillaDemoComponent extends RxJsState<any> implements OnDestroy {
  subscription = new Subscription();
  value$ = this.select();

  constructor() {
    super();
    this.subscription.add(this.subscribe());
    this.setState({ test: 43 });
    console.log(this.select());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
