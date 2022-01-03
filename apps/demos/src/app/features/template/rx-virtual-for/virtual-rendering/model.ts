import { Directive, NgIterable, TrackByFunction } from '@angular/core';
import { Observable } from 'rxjs';

export interface ListRange {
  start: number;
  end: number;
}

@Directive()
export abstract class VirtualViewRepeater<
  T,
  U extends NgIterable<T> = NgIterable<T>
> {
  _trackBy: TrackByFunction<T> = (i, a) => a;
  values$: Observable<NgIterable<T>>;
  contentRendered$: Observable<any>;
}
