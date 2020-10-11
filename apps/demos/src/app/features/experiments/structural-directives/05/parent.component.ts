import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { merge, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { immutableArr, immutableIncArr } from '../utils';

@Component({
  selector: 'rxa-cd-embedded-view-parent05',
  template: `
    <h2>
      CD EmbeddedView 05
      <small>Local Variables</small>
      <rxa-dirty-check></rxa-dirty-check>
    </h2>

    <button mat-raised-button [unpatch] (click)="changeOneClick$.next(1)">
      update
    </button>
    <button mat-raised-button [unpatch] (click)="changeAllClick$.next(10)">
      Change all
    </button>

    <!-- <pre>{{array$ | push | json}}</pre> -->
    <mat-checkbox></mat-checkbox>
    <div class="row">
      <div class="col">
        <h2>Static Custom Variables</h2>
        <ng-container
          *poc5LocV="array$;
          let value;
          localVariableProjections: localVariableProjections;
          let index = index;
          let first = first;
          let last = last;
          let customVariable = customVariable;
          ">
          id: {{value.id}},
          index: {{index}},
          first: {{first}},
          last: {{last}}, <br/>
          customVariable: {{customVariable | json}}<br/>
          <b>Item: </b>
          <rxa-dirty-check></rxa-dirty-check>
          <ng-container *ngFor="let item of value.arr; trackBy: trackById">
            <rxa-dirty-check [radius]="10"></rxa-dirty-check>
            child: {{item.value}}
          </ng-container>
          <br/>
        </ng-container>
      </div>
    </div>
  `,
  changeDetection: environment.changeDetection,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .row {
      display: flex;
    }

    .col {
      width: 49%;
    }
  `]
})
export class CdEmbeddedViewParent05Component {


  localVariableProjections = {
    test: (a) => {
      // tslint:disable-next-line:no-bitwise
      return ~~a.$implicit;
    }
  };

  changeOneClick$ = new Subject<number>();
  changeAllClick$ = new Subject<number>();

  array$ = merge(
    this.changeOneClick$.pipe(immutableIncArr()),
    this.changeAllClick$.pipe(immutableArr())
  ).pipe(
    share()
  );

  trackById = (i) => i.id;

}
