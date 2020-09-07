import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { todos } from '../data';

@Component({
  selector: 'app-for-poc-basic-parent',
  template: `
    <h2>
      RxFor Basic Implementation
    </h2>

    <button [unpatch] (click)="toggleClick$.next($event)">
      toggle
    </button>

    <renders></renders>

    <div class="row">
      <div class="col">
        <ng-container *pocForBasic="items$; let item">
          <renders></renders>
          {{ item }}
        </ng-container>
      </div>

    </div>
  `,
  changeDetection: environment.changeDetection,
})
export class ForPocBasicParentComponent {
  toggleClick$ = new Subject<Event>();
  items$ = this.toggleClick$.pipe(
    map(() => [...todos])
  );
}
