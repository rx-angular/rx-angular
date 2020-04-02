import { Component, OnDestroy } from '@angular/core';
import { RxState } from '@ngx-rx/ngx-rx-state';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ng-demo',
  template: `ng-demo: {{value$ | async | json}}`
})
export class NgDemoComponent extends RxState<{}> {
  value$ = this.select();

  constructor() {
    super();
    this.setState({test: 43})
  }

}
