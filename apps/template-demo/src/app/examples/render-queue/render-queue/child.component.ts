import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getExperimentalLocalStrategies } from '@rx-angular/template';
import { Renderable } from '../interfaces';

@Component({
  selector: 'rx-angular-child',
  template: `
    <table>
      <tr *ngFor="let item of items">
        <td>{{ item }}</td>
      </tr>
    </table>
  `,
  styles: [
    `
      :host {
        width: 150px;
        height: 150px;
        border: 1px red solid;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: scroll;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent extends RxState<Renderable<ChildComponent>>
  implements OnInit, OnDestroy {
  renderings = 0;

  destroyed = new Subject();

  doRenderChunked = new Subject<string>();
  doRenderBlocking = new Subject<string>();

  items = Array.from(Array(100).keys()).map(() => Math.random());

  private strategies;

  constructor(private cdRef: ChangeDetectorRef) {
    super();
    this.set({ self: this });
  }

  ngOnInit() {
    this.strategies = getExperimentalLocalStrategies({ cdRef: this.cdRef });
    this.hold(
      this.doRenderBlocking.pipe(
        tap(() => this.updateItems()),
        this.strategies.blocking.rxScheduleCD
      ),
      () => {
        //console.log('rendered', this);
      }
    );
    this.hold(
      this.doRenderChunked.pipe(
        tap(() => this.updateItems()),
        this.strategies.chunk.rxScheduleCD
      ),
      () => {
        //console.log('rendered', this);
      }
    );
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.destroyed.complete();
  }

  renderStatic(strategyName: string) {
    this.updateItems();
    this.strategies[strategyName].scheduleCD();
  }

  render() {
    return this.renderings++;
  }

  private updateItems(): void {
    this.items = Array.from(Array(100).keys()).map(() => Math.random());
  }
}
