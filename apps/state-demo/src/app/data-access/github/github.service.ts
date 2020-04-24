import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { RepositoryListItem } from './+state/repository-list.model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  constructor(private http: HttpClient) {}

  getData = (arg?: any) =>
    // tslint:disable-next-line:no-bitwise
    of(getData(arg)).pipe(delay(~~(Math.random() * 5000)));
}

export function getData(cfg = { num: 5 }): RepositoryListItem[] {
  // tslint:disable-next-line:no-bitwise
  const randId = (s: string) => s + ~~(Math.random() * 100);
  return new Array(cfg.num).fill(cfg.num).map(_ => ({
    id: randId('id'),
    name: randId('name'),
    created: Date.now() / 1000 + ''
  }));
}
