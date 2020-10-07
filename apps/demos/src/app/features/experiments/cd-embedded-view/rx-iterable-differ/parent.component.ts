import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ArrayProviderService, TestItem } from '../../../../shared/debug-helper/value-provider';
import { diffByKey, diffByIndex, rxIterableDifferFactory } from './rx-differ';
import { RxState } from '../../../../../../../../libs/state/src/lib';


@Component({
  selector: 'rxa-cd-embedded-view-parent-rx-differ',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>Reactive Iterable Differ</h2>
        <div>
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
        <div>
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
        <div>
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
        <ng-container *ngFor="let i of valP.array$ | push; trackBy: trackByIdFn">
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
export class CdEmbeddedViewParentRxDifferComponent extends RxState<any>{
  rxDiffer = rxIterableDifferFactory({
    trackBy: 'id',
    distinctBy: 'value'
  });
  trackByKey = 'id';
  distinctByKey = 'value';
  trackByIdFn = (a) => a.id;


  constructor(public valP: ArrayProviderService) {
    super();
    this.setupRxDiffer()
    // this.hold(this.valP.array$, this.setupFunctionalDiffer());
    this.hold(this.valP.array$, this.rxDiffer.next);
  }

  setupFunctionalDiffer() {
    let oldData = [];
    return newData => {
        const indexDifferResult = diffByIndex(oldData, newData);
        console.log('##diffByIndex');
        console.log('enter', indexDifferResult.enter);
        console.log('update', indexDifferResult.update);
        console.log('exit', indexDifferResult.exit);
        const keyDifferResult = diffByKey(oldData, newData, (i) => i.id );
        console.log('##diffByKey');
        console.log('enter', keyDifferResult.enter);
        console.log('update', keyDifferResult.update);
        console.log('exit', keyDifferResult.exit);
        oldData = [...newData];
      }
  }

  setupRxDiffer() {
    this.rxDiffer.connect();
    this.rxDiffer.enter$.subscribe((result) => {
      console.log('enter', result);
    });
    this.rxDiffer.update$.subscribe((result) => {
      console.log('update', result);
    });
    this.rxDiffer.exit$.subscribe((result) => {
      console.log('exit', result);
    });
  }
}
