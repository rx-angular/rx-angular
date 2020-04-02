import { Component, OnDestroy } from '@angular/core';
import { RxState } from 'rxjs-state';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vanilla-demo',
  template: `value$: {{value$ | async | json}}`
})
export class VanillaExampleComponent extends RxState<{}> implements OnDestroy {
  subscription = new Subscription();
  value$ = this.select();

  constructor() {
    super();
    this.subscription.add(this.subscribe());
    this.setState({test: 43})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
