import { MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { priorityTickMap, SchedulingPriority } from '../scheduling';
import { ɵdetectChanges, ɵmarkDirty } from '@angular/core';
import { coalesceWith } from './coalesceWith';
import { promiseTick } from '../scheduling/promiseTick';

export function renderChange(
  ref: /*ComponentInstance |*/ HTMLElement,
  options: {
    parent?: boolean;
    scheduleCD?: false | SchedulingPriority;
  }
): MonoTypeOperatorFunction<any> {
  const tick$ =
    options.scheduleCD !== false ? priorityTickMap[options.scheduleCD] : false;
  const render = () => {
    if (options.parent) {
      ɵmarkDirty(ref);
    } else {
      ɵdetectChanges(ref);
    }
  };

  return (s: Observable<any>): Observable<any> => {
    if (!options.scheduleCD) {
      render();
      return s;
    }

    return s.pipe(
      coalesceWith(promiseTick()),
      switchMap(() => {
        if (tick$) {
          return tick$.pipe(tap(() => render()));
        }
        return of(0).pipe(tap(() => render()));
      })
    );
  };
}
