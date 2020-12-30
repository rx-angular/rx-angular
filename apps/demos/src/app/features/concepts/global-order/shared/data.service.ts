import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { filter, map, tap } from 'rxjs/operators';

type actions = { inc: number } | { dec: number };

function unwrapAction<T>(prop: string) {
  return (o$: Observable<T>) => o$.pipe(
    filter(action => Object.keys(action).includes(prop)),
    map(action => action[prop])
  );
}

@Injectable({
  providedIn: 'root'
})
export class DataService extends RxState<{ count: number }> {

  private action$ = new Subject<actions>();
  count$: Observable<number> = this.select('count');

  constructor() {
    super();
    this.set({count: 0});
    this.connect('count', this.action$.pipe(unwrapAction('inc')), (s, num) => s?.count + num);
    this.connect('count', this.action$.pipe(unwrapAction('dec')), (s, num) => s?.count - num);
  }

  increment(inc: number) {
    this.action$.next({ inc });
  }

  decrement(dec: number) {
    this.action$.next({ dec });
  }

}
