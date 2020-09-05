import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'list-item-ghost',
  template: `
    <div *ngFor="let n of numItems" class="list-item-ghost">
      <ngx-skeleton-loader class="icon-ghost" [appearance]="'circle'"></ngx-skeleton-loader>
      <div class="text-ghost">
        <ngx-skeleton-loader [count]="3"></ngx-skeleton-loader>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .list-item-ghost {
      position: relative;
      text-align: left;
      width: 100%;
      display: flex;
      flex-direction: row;
      margin-bottom: 8px;
    }

    .list-item-ghost .icon-ghost {
      margin-right: 15px;
    }

    .list-item-ghost .icon-ghost .loader.circle {
      width: 35px;
      height: 35px;
      margin: 0;
    }

    .list-item-ghost .text-ghost {
      flex-grow: 2;
      line-height: 10px;
    }

    .list-item-ghost .text-ghost .loader {
      height: 8px;
      margin: 0 0 5px 0;
    }

    .list-item-ghost .text-ghost .loader:first-child {
      width: 70%;
    }

    .list-item-ghost .text-ghost .loader:nth-child(2) {
      width: 90%;
    }

    .list-item-ghost .text-ghost .loader:nth-child(3) {
      width: 50%;
    }
  `]
})
export class ListItemGhostComponent {

  numItems = [0];
  @Input()
  set count(n: number) {
    this.numItems = Array(n < 1 ? 1 : n).fill(0);
  }
}
