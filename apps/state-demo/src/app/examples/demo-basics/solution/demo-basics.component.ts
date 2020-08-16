import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DemoBasicsViewModelService } from './demo-basics.view-model.service';
import { RxState } from '@rx-angular/state';
import { DemoBasicsAdapterService } from './demo-basics.adapter.service';

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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DemoBasicsViewModelService, DemoBasicsAdapterService],
})
export class DemoBasicsComponent extends RxState<any> {
  @Input()
  set refreshInterval(refreshInterval: number) {
    this.vm.set({ refreshInterval });
  }

  numRenders = 0;
  rerenders(): number {
    return ++this.numRenders;
  }

  constructor(
    public vm: DemoBasicsViewModelService,
    private ca: DemoBasicsAdapterService
  ) {
    super();

    this.vm.connect('list', this.ca.list$);
    this.vm.connect('isPending', this.ca.loadingSignal$);
    this.hold(this.vm.refreshListSideEffect$, (_) => this.ca.refetchList());
  }
}
