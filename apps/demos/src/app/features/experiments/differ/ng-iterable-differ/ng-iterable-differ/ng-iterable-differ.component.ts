import { Component, IterableChanges, IterableDiffers, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ArrayProviderService } from '../../../../../shared/debug-helper/value-provider';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'rxa-differ-ng-iterable-differ',
  template: `
    <rxa-visualizer>
      <div visualizerHeader class="row">
        <div class="col-sm-12"><h2>Angular Iterable Differ</h2></div>
        <div class="col-sm-12">
          <p>Observable Context</p>
          <button mat-raised-button (click)="valP.reset()">
            Reset
          </button>
          <button mat-raised-button (click)="valP.error()">
            Error
          </button>
          <button mat-raised-button (click)="valP.complete()">
            Complete
          </button>
        </div>
        <div class="col-sm-6">
          <p>Mutable Operations</p>
          <button mat-raised-button (click)="valP.addItemsMutable()">
            Add
          </button>
          <button mat-raised-button (click)="valP.moveItemsMutable()">
            Move
          </button>
          <button mat-raised-button (click)="valP.updateItemsMutable()">
            Update
          </button>
          <button mat-raised-button (click)="valP.removeItemsMutable()">
            Remove
          </button>
        </div>
        <div class="col-sm-6">
          <p>Immutable Operations</p>
          <button mat-raised-button (click)="valP.addItemsImmutable()">
            Add
          </button>
          <button mat-raised-button (click)="valP.moveItemsImmutable()">
            Move
          </button>
          <button mat-raised-button (click)="valP.updateItemsImmutable()">
            Update
          </button>
          <button mat-raised-button (click)="valP.removeItemsImmutable()">
            Remove
          </button>
        </div>
      </div>
      <div>
        <ng-container *ngFor="let i of valP.array$ | async; trackBy: trackByIdFn">
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
export class NgIterableDifferComponent extends RxState<any> {
  ngDiffer;
  trackByIdFn = (a) => a.id;

  constructor(public valP: ArrayProviderService,
              private iterableDiffers: IterableDiffers) {
    super();
    this.ngDiffer = this.iterableDiffers.find([]).create((idx, item) => this.trackByIdFn(item));
    this.hold(this.valP.array$, this.setupFunctionalDiffer());
  }

  setupFunctionalDiffer<T>() {
    return (newData: T[]) => {
      const ngDifferResult: IterableChanges<T> = this.ngDiffer.diff(newData);
      console.log('##ngDiffer');

      if (ngDifferResult === null) {
        console.log('null change');
        return;
      }
      console.log('enter');
      ngDifferResult.forEachAddedItem(console.log);
      console.log('move');
      ngDifferResult.forEachMovedItem(console.log);
      console.log('remove');
      ngDifferResult.forEachRemovedItem(console.log);
      console.log('identityChange');
      ngDifferResult.forEachIdentityChange(console.log);
    };
  }
}
