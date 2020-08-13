import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  EMPTY,
  Observable,
  of,
  range,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-rx-state-parent-selections',
  template: `
    <h2>Selection Handling</h2>
    <div class="case-content">
      <pre>{{ values$ | async | json }}</pre>
      <app-rx-state-child-selections
        [formGroupModel]="formGroupModel$ | async"
        (formValueChange)="values$.next($event)"
      >
      </app-rx-state-child-selections>
    </div>
  `,
  changeDetection: environment.changeDetection,
})
export class RxStateParentSelectionsComponent {
  values$ = new Subject();

  formGroupModel$ = of({
    name: '',
    age: 0,
  });
}
