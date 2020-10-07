import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ArrayProviderService } from '../../../../../shared/debug-helper/value-provider';
import { RxState } from '@rx-angular/state';


@Component({
  selector: 'rxa-rx-for-differ',
  template: `
    <rxa-visualizer>
      <div visualizerHeader class="row">
        <div class="col-sm-12"><h2>rxFor with Differ</h2></div>
        <div class="col-sm-12">
          <p>Observable Context</p>
          <button mat-raised-button [unpatch] (click)="valP.reset()">
            Reset
          </button>
          <button mat-raised-button [unpatch] (click)="valP.error()">
            Error
          </button>
          <button mat-raised-button [unpatch] (click)="valP.complete()">
            Complete
          </button>
        </div>
        <div class="col-sm-6">
          <p>Mutable Operations</p>
          <button mat-raised-button [unpatch] (click)="valP.addItemsMutable()">
            Add
          </button>
          <button mat-raised-button [unpatch] (click)="valP.moveItemsMutable()">
            Move
          </button>
          <button mat-raised-button [unpatch] (click)="valP.updateItemsMutable()">
            Update
          </button>
          <button mat-raised-button [unpatch] (click)="valP.removeItemsMutable()">
            Remove
          </button>
        </div>
        <div class="col-sm-6">
          <p>Immutable Operations</p>
          <button mat-raised-button [unpatch] (click)="valP.addItemsImmutable()">
            Add
          </button>
          <button mat-raised-button [unpatch] (click)="valP.moveItemsImmutable()">
            Move
          </button>
          <button mat-raised-button [unpatch] (click)="valP.updateItemsImmutable()">
            Update
          </button>
          <button mat-raised-button [unpatch] (click)="valP.removeItemsImmutable()">
            Remove
          </button>
        </div>
      </div>
      <div>
        <ng-container *rxForDiffer="valP.array$;
                      trackBy: trackByKey
                      distinctBy:distinctByKey
                      let i;
        ">
          <rxa-dirty-check>{{i | json}}</rxa-dirty-check>
          <pre>
            {{i | json}}
        </pre>
        </ng-container>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: environment.changeDetection,
  encapsulation: ViewEncapsulation.None,
  providers: [ArrayProviderService]
})
export class RxForDifferComponent extends RxState<any> {
  trackByKey = 'id';
  distinctByKey = 'value';
  trackByFn = (a) => a.id;
  distinctByFn = (a) => a.value;


  constructor(public valP: ArrayProviderService) {
    super();
  }

}
