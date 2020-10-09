import { Observable } from 'rxjs';
import { IterableChanges } from '@angular/core';

export function fromFor<T>(fn: string) {
  return (o$: Observable<IterableChanges<T>>) => new Observable<T[]>((s) => {
    const subscription = o$.subscribe(n => {
      const a: T[] = [];
      // tslint:disable-next-line:no-unused-expression
      if(n != null) {
        n[fn](v => a.push(v.item));
        s.next(a);
      } else {
        s.next([])
      }
    });
    return subscription.unsubscribe;
  });
}
