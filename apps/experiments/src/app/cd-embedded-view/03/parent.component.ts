import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-cd-embedded-view-parent03',
  template: `
    <h2>
      CD EmbeddedView 03
      <renders></renders>
    </h2>

    <button [unpatch] (click)="toggleClick$.next($event)">
      toggle
    </button>


    <div class="row">
      <div class="col">
        <ng-container *pocFor="value1$; let i; trackBy: 'id'">
          <renders></renders> - i: {{i | json}}<br/>
        </ng-container>
      </div>
      <div class="col">
        <ng-container *poc2For="value1$; let i; trackBy: 'id'">
          <renders></renders> - i: {{i | json}}<br/>
        </ng-container>
      </div>

    </div>
  `,
  styles: [`
    .row {
      display: flex;
    }
    .col {
      width: 50%;
    }
  `],
  changeDetection: environment.changeDetection,
})
export class CdEmbeddedViewParent03Component {
  toggleClick$ = new Subject<Event>();
  value1$ = this.toggleClick$.pipe(
    scan((a, i, idx) => {
      const value = this.rand();
      a[idx%10] = {id:idx%10,  value: idx};
      return a;
    }, [])
  );

  rand(): number {
    // tslint:disable-next-line:no-bitwise
    return ~~(Math.random()*10)
  }
}
