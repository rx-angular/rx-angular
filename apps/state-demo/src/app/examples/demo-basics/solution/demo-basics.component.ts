import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import {
  ListServerItem,
  ListService
} from '../../../data-access/list-resource';
import {
  DemoBasicsItem,
  DemoBasicsViewModelService
} from './demo-basics.view-model.service';

@Component({
  selector: 'demo-basics',
  templateUrl: './demo-basics.view.html',
  styles: [
    `
      .list .mat-expansion-panel-header {
        position: relative;
      }
      .list .mat-expansion-panel-header mat-progress-bar {
        position: absolute;
        top: 0px;
        left: 0;
      }

      .list .mat-expansion-panel-content .mat-expansion-panel-body {
        padding-top: 10px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DemoBasicsViewModelService]
})
export class DemoBasicsComponent {
  @Input()
  set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 4000) {
      this.vm.set({ refreshInterval });
    }
  }

  numRenders = 0;
  rerenders(): number {
    return ++this.numRenders;
  }

  constructor(
    public vm: DemoBasicsViewModelService,
    private listService: ListService
  ) {
    this.vm.connect(
      'list',
      this.listService.list$.pipe(map(this.parseListItems))
    );
    this.vm.hold(
      this.vm.refreshListSideEffect$.pipe(
        tap(_ => this.listService.refetchList())
      )
    );
    this.vm.connect('isPending', this.listService.loadingSignal$);
  }

  parseListItems(l: ListServerItem[]): DemoBasicsItem[] {
    return l.map(({ id, name }) => ({ id, name }));
  }
}
