import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'form-ghost',
  template: `
    <div *ngFor="let n of numItems" class="form-ghost">
      <ngx-skeleton-loader class="input-ghost"></ngx-skeleton-loader>
      <ngx-skeleton-loader class="input-ghost"></ngx-skeleton-loader>
      <ngx-skeleton-loader class="input-ghost"></ngx-skeleton-loader>
      <ngx-skeleton-loader class="input-ghost"></ngx-skeleton-loader>
      <ngx-skeleton-loader class="button-ghost"></ngx-skeleton-loader>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .form-ghost {
      position: relative;
      text-align: left;
      width: 100%;
    }

    .form-ghost .button-ghost {
      width: 50px;
      float: right;
    }

    .form-ghost .input-ghost {
      float: left;
      line-height: 10px;
      width: 100%;
    }

    .form-ghost .input-ghost .loader {
      border: 1px solid lightgray;
    }

    .form-ghost .input-ghost:first-child {
      width: 48%;
      padding-right: 5px;
    }

    .form-ghost .input-ghost:nth-child(2) {
       width: 48%;
       float: right;
    }
  `]
})
export class FormGhostComponent {

  numItems = [0];
  @Input()
  set count(n: number) {
    this.numItems = Array(n < 1 ? 1 : n).fill(0);
  }
}
