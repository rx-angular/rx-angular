import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { merge, Subject } from 'rxjs';
import { map, scan, share, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-cd-embedded-view-parent04',
  template: `
    <h2>
      CD EmbeddedView 04
      <renders></renders>
    </h2>

    <button [unpatch] (click)="toggleClick$.next($event)">
      toggle
    </button>

    <div class="row">
      <div class="col">
      </div>
      <div class="col">
        {{array$ | push | json}}
        <ng-container
          *poc5LocV="array$;
          let value;
          localVariableProjections: localVariableProjections;
          let index = index;
          let first = first;
          let last = last;
          let customVariable = customVariable;
          ">
          {{value | json}}<br/>
          {{index}}<br/>
          {{first}}<br/>
          {{last}}<br/>
          {{customVariable.test}}<br/>
        </ng-container>
      </div>
    </div>
  `,
  changeDetection: environment.changeDetection
})
export class CdEmbeddedViewParent05Component {
  toggleClick$ = new Subject<Event>();

  localVariableProjections= {
    test: (a) => {
      console.log('a', a);
      // tslint:disable-next-line:no-bitwise
      return ~~a.$implicit
    }
  }

  array$ = merge(
    this.toggleClick$.pipe(scan(a => ([...a, {
      // tslint:disable-next-line:no-bitwise
      id: ~~Math.random() * 100,
      // tslint:disable-next-line:no-bitwise
      name: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
    }]), [])),
  ).pipe(
    share()
  );

}
