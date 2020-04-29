import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { ListServerItem } from './list.server.model';
import {
  catchError,
  delay,
  distinctUntilChanged,
  filter,
  map,
  startWith
} from 'rxjs/operators';

interface ListServiceState {
  list: any[];
  loading: boolean;
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private state$ = new BehaviorSubject<Partial<ListServiceState>>({
    list: [],
    loading: false,
    error: ''
  });

  list$ = this.state$.pipe(
    map(s => s.list),
    distinctUntilChanged()
  );

  errorSignal$ = this.state$.pipe(
    map(s => s.error),
    filter(b => !!b)
  );
  successSignal$ = this.state$.pipe(
    map(({ loading, error }) => ({ loading, error })),
    filter(o => o.loading === false && o.error !== '')
  );
  loadingSignal$ = this.state$.pipe(
    map(({ loading }) => loading),
    filter(b => b)
  );

  constructor(private http: HttpClient) {
    this.state$.subscribe(console.log);
  }

  refetchList() {
    this.state$.next({ ...this.state$.getValue(), loading: false });
    this.httpGetListItem({ num: 1 })
      .pipe(catchError(e => of({ error: e, loading: false, list: [] })))
      .subscribe(slice => {
        console.log('list: ', this.state$.getValue());
        return this.state$.next({
          error: '',
          list: [...this.state$.value.list, ...slice.list],
          loading: false
        });
      });
  }

  httpGetListItem = (arg?: any): Observable<{ list: any[] }> =>
    // tslint:disable-next-line:no-bitwise
    of(getData(arg)).pipe(
      delay(~~(Math.random() * 5000)),
      map(list => ({ list }))
    );
}

export function getData(cfg = { num: 5 }): ListServerItem[] {
  // tslint:disable-next-line:no-bitwise
  const randId = (s: string) => s + ~~(Math.random() * 100);
  return new Array(cfg.num).fill(cfg.num).map(_ => ({
    id: randId('id'),
    name: randId('name'),
    created: Date.now() / 1000 + ''
  }));
}
