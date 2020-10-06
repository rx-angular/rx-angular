import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ArrayProviderService } from '../../../../shared/debug-helper/value-provider';


@Component({
  selector: 'rxa-cd-embedded-view-parent-rx-differ',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>Reactive Iterable Differ</h2>
        <button mat-raised-button [unpatch] (click)="valP.reset()">
          Reset
        </button>
        <button mat-raised-button [unpatch] (click)="valP.error()">
          Error
        </button>
        <button mat-raised-button [unpatch] (click)="valP.complete()">
          Complete
        </button>
        <button mat-raised-button [unpatch] (click)="valP.addItems()">
          Add
        </button>
        <button mat-raised-button [unpatch] (click)="valP.moveItems()">
          Move
        </button>
        <button mat-raised-button [unpatch] (click)="valP.updateItems()">
          Update
        </button>
        <button mat-raised-button [unpatch] (click)="valP.removeItems()">
          Remove
        </button>
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
export class CdEmbeddedViewParentRxDifferComponent {
  trackByKey = 'id';
  distinctByKey = 'value';
  trackByIdFn = (a) => a.id;

  constructor(public valP: ArrayProviderService) {

  }
}
