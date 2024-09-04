import { Component, signal } from '@angular/core';
import {
  AutoSizeVirtualScrollStrategy,
  RxVirtualScrollViewportComponent,
  RxVirtualFor,
} from '@rx-angular/template/experimental/virtual-scrolling';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RxVirtualFor,
    RxVirtualScrollViewportComponent,
    AutoSizeVirtualScrollStrategy,
  ],
  template: `
    <rx-virtual-scroll-viewport autosize [tombstoneSize]="63">
      <div
        *rxVirtualFor="
          let item of items$;
          trackBy: 'id';
          renderCallback: renderedItems
        "
        style="width: 100%;"
      >
        <p>{{ item.name }}</p>
      </div>
    </rx-virtual-scroll-viewport>
  `,
})
export class VirtualForCrazyUpdateComponent {
  items = signal(
    Array.from({ length: 200 }).map((_item, index) => ({
      id: index,
      name: `item #${index}`,
    })),
  );
  items$ = new BehaviorSubject(
    Array.from({ length: 200 }).map((_item, index) => ({
      id: index,
      name: `item #${index}`,
    })),
  );

  renderedItems = new Subject<any[]>();

  constructor() {
    this.renderedItems.subscribe(() => console.log('Completed rendering'));

    setTimeout(() => {
      this.items$.next(
        this.items$.getValue().filter((item) => item.id % 2 === 0),
      );
      this.items.update((items) => items.filter((item) => item.id % 2 === 0));
      console.log('Updating items');
    }, 350);
  }
}
