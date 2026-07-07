import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DemoBasicsViewModelService } from './demo-basics.view-model.service';
import { RxState } from '@rx-angular/state';
import { DemoBasicsAdapterService } from './demo-basics.adapter.service';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
  MatExpansionPanelDescription,
} from '@angular/material/expansion';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { MatCard } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'rxa-demo-basics',
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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DemoBasicsViewModelService, DemoBasicsAdapterService],
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatProgressBar,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatButton,
    MatList,
    MatListItem,
    MatCard,
    AsyncPipe,
  ],
})
export class DemoBasicsComponent extends RxState<any> {
  @Input()
  set refreshInterval(refreshInterval: number) {
    this.vm.set({ refreshInterval });
  }

  constructor(
    public vm: DemoBasicsViewModelService,
    private ca: DemoBasicsAdapterService,
  ) {
    super();

    this.vm.connect('list', this.ca.list$);
    this.vm.connect('isPending', this.ca.loadingSignal$);
    this.hold(this.vm.refreshListSideEffect$, (_) => this.ca.refetchList());
  }
}
