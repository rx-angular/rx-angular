import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { ComponentState } from './presenter';
import { ListServerItem, ListService } from '../data-access/list-resource';
import { DemoBasicsItem } from './presenter-pattern.start.component';
import { map } from 'rxjs/operators';

Injectable()
export class Adapter extends RxState<Pick<ComponentState, 'list'>> {

  list$ = this.select('list');
  constructor(
    private listService: ListService
  ) {
    super();
    this.connect('list', this.listService.list$
      .pipe(map(this.parseListItems))
    );
  }

  refresh = () => {
    this.listService.refetchList()
  }

  parseListItems(l: ListServerItem[]): DemoBasicsItem[] {
    return l.map(({ id, name }) => ({ id, name }));
  }
}
