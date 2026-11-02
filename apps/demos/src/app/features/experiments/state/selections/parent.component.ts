import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { of, Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { RxStateChildSelectionsComponent } from './child.component';

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
  changeDetection: environment.changeDetection,
  imports: [RxStateChildSelectionsComponent, AsyncPipe, JsonPipe],
})
export class RxStateParentSelectionsComponent {
  values$ = new Subject();

  formGroupModel$ = of({
    name: '',
    age: 0,
  });
}
