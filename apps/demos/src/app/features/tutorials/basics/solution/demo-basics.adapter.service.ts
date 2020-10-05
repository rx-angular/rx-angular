import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DemoBasicsItem } from './demo-basics.view-model.service';
import { ListServerItem, ListService } from '../data-access/list-resource';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class DemoBasicsAdapterService extends RxState<any> {
  loadingSignal$ = this.listService.loadingSignal$;
  list$: Observable<DemoBasicsItem[]> = this.listService.list$.pipe(
    map(this.parseListItems)
  );

  constructor(private listService: ListService, route: ActivatedRoute) {
    super();
    this.hold(route.params, () => this.refetchList());
  }

  refetchList() {
    this.listService.refetchList();
  }

  parseListItems(l: ListServerItem[]): DemoBasicsItem[] {
    return l.map(({ id, name }) => ({ id, name }));
  }
}
