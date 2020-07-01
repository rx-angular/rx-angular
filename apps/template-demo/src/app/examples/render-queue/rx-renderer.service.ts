import { Injectable, ɵdetectChanges as detectChanges } from '@angular/core';
import { RxState } from '@rx-angular/state';
import {
  coalesceWith,
  getUnpatchedResolvedPromise
} from '@rx-angular/template';
import { from, Observable } from 'rxjs';
import { groupBy, map, mergeAll, tap } from 'rxjs/operators';

interface RendererState {
  ref?: any;
}

@Injectable({
  providedIn: 'root'
})
export class RxRenderer extends RxState<RendererState> {
  constructor() {
    super();
    this.hold(
      this.$.pipe(
        groupBy(v => v.ref),
        map(o =>
          o.pipe(
            coalesceWith(from(getUnpatchedResolvedPromise())),
            tap({
              next: v => detectChanges(v['ref']),
              complete: () => {
                console.log('someone completed', o.key);
              }
            })
          )
        ),
        mergeAll()
      )
    );
  }

  public myConnect(o$: Observable<any>) {
    o$.subscribe({
      complete: () => console.log('completed', o$)
    });
  }
}
