import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { EMPTY, interval, merge, Subject } from 'rxjs';
import { scan, share, switchMap } from 'rxjs/operators';
import { immutableArr, immutableIncArr } from '../utils';
import { ValueProviderService } from '../../../../shared/debug-helper/value-provider';


@Component({
  selector: 'rxa-cd-embedded-view-parent-rx-differ',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h2>Reactive Iterable Differ</h2>
        <button mat-raised-button [unpatch] (click)="valP.addItems(1)">
          Add
        </button>
        <button mat-raised-button [unpatch] (click)="valP.updateItems([1])">
          Update
        </button>
      </ng-container>
      <div>
        {{valP.array$ | push | json}}
      </div>
    </rxa-visualizer>
  `,
  changeDetection: environment.changeDetection,
  encapsulation: ViewEncapsulation.None,
  providers: [ValueProviderService]
})
export class CdEmbeddedViewParentRxDifferComponent {
  trackByKey = 'id';
  distinctByKey = 'value';

  constructor(public valP: ValueProviderService) {

  }


}
