import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'rxa-error-handling-parent',
  template: `
    <div class="container pt-5">
      <div class="d-flex">
        <rxa-array-provider
          [unpatched]=""
          [buttons]="true"
          #arrayP="rxaArrayProvider"
        ></rxa-array-provider>
      </div>
      <div class="d-flex flex-wrap">
        <rxa-error-handling-child
          *rxFor="let child of arrayP.array$; let i = index; trackBy: 'id'"
          [index]="i"
        ></rxa-error-handling-child>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
  ]
})
export class ErrorHandlingParentComponent implements OnInit {

  children = new Array(50).map((v, i) => i + 1);

  constructor() {
    console.log(this.children);
  }

  ngOnInit(): void {
  }

}
