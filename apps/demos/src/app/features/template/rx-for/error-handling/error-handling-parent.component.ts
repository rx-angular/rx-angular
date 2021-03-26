import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'rxa-error-handling-parent',
  template: `
    <div class="container pt-5">
      <div class="d-flex">
        <rxa-array-provider
          [unpatched]="[]"
          [buttons]="true"
          #arrayP="rxaArrayProvider"
        ></rxa-array-provider>
      </div>
      <div class="d-flex justify-content-between">
        <div>
          <h2 class="mat-subheading-1">*rxFor</h2>
          <div class="d-flex flex-wrap">
            <rxa-error-handling-child
              *rxFor="let child of arrayP.array$; let i = index; trackBy: trackItem"
              [index]="i"
            ></rxa-error-handling-child>
          </div>
        </div>
        <div>
          <h2 class="mat-subheading-1">*ngFor</h2>
          <div class="d-flex flex-wrap">
            <rxa-error-handling-child
              *ngFor="let child of arrayP.array$ | async; let i = index; trackBy: trackItem"
              [index]="i"
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

  trackItem = (i: number, item: any) => item.id;

}
