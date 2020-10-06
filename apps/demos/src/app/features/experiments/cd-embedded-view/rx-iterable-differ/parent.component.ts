import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ArrayProviderService } from '../../../../shared/debug-helper/value-provider';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, groupBy, map, mergeAll, mergeMap, tap } from 'rxjs/operators';
import { toDictionary } from '../../../../../../../../libs/state/src/lib/transformation-helpers/array';


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

function rxIterableDiffer<T extends object>(config: { trackByKey: keyof T, distinctByKey: keyof T }): {
  next: (v: T[]) => void,
  enter$: Observable<T>,
  update$: Observable<T>,
  exit$: Observable<T>
} {
  const array$ = new Subject<T[]>();
  let idMap = {};
  const item$$ = array$.pipe(
    tap(a => {
      // @TODO good idea?? I guess no... :D
      idMap = toDictionary(a, config.trackByKey as any)
    }),
    mergeMap(arr => arr),
    groupBy(i => i[config.trackByKey])
  );
  const enter$ = item$$.pipe(
    map(o$ => o$
      .pipe(distinctUntilChanged((a, b) => a[config.distinctByKey] === b[config.distinctByKey]))
    ),
    mergeAll()
  );
  const update$ = item$$.pipe(
    map(o$ => o$
      .pipe(distinctUntilChanged((a, b) => a[config.distinctByKey] === b[config.distinctByKey]))
    ),
    mergeAll()
  );
  const exit$ = item$$.pipe(
    map(o$ => o$
      .pipe(distinctUntilChanged((a, b) => a[config.distinctByKey] === b[config.distinctByKey]))
    ),
    mergeAll()
  );

  return {
    next,
    enter$,
    update$,
    exit$
  };

  function next(v: T[]): void {
    array$.next(v);
  }
}
