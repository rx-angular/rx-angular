import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { of, Subject } from 'rxjs';

@Component({
  selector: 'rxa-state-parent-selections',
  template: `
    <h2>Selection Handling</h2>
    <div class="case-content">
      <pre>{{ values$ | async | json }}</pre>
      <rxa-state-child-selections
        [formGroupModel]="formGroupModel$ | async"
        (formValueChange)="values$.next($event)"
      >
      </rxa-state-child-selections>
    </div>
  `,
  changeDetection: environment.changeDetection
})
export class RxStateParentSelectionsComponent {
  values$ = new Subject();

  formGroupModel$ = of({
    name: '',
    age: 0
  });
}
