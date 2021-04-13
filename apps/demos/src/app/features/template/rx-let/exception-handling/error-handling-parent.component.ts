import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'rxa-error-handling-parent',
  template: `
    <div class="container pt-5">
      <div class="d-flex">
        <rxa-value-provider
          [unpatched]="[]"
          [buttons]="true"
          #valueProvider="rxaValueProvider"
        ></rxa-value-provider>
      </div>
      <div class="d-flex justify-content-between">
        <div>
          <h2 class="mat-subheading-1">*rxLet</h2>
          <div class="d-flex flex-wrap">
            <rxa-error-handling-child
              *rxLet="valueProvider.int$; let v"
              [index]="v"
            ></rxa-error-handling-child>
          </div>
        </div>
        <div>
          <h2 class="mat-subheading-1">async pipe</h2>
          <div class="d-flex flex-wrap">
            <rxa-error-handling-child
              *ngIf="valueProvider.int$ | async as v"
              [index]="v"
            ></rxa-error-handling-child>
          </div>
        </div>
      </div>

    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
  ]
})
export class ErrorHandlingParentComponent {


}
