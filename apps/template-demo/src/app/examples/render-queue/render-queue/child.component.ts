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
import { getGlobalRenderingStrategies } from '../../../global-rendering';
import { Renderable } from '../interfaces';
import { getStrategies } from '@rx-angular/template';

@Component({
  selector: 'rx-angular-child',
  template: `
    <renders class="renders"></renders>
    <table>
      <tr *ngFor="let item of items">
        <td>{{ item }}</td>
      </tr>
    </table>
  `,
  styles: [
    `
      :host {
        position: relative;
        width: 75px;
        height: 75px;
        border: 1px tomato solid;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
      }
      table {
        visibility: hidden;
      }
      .renders {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent extends RxState<Renderable<ChildComponent>>
  implements OnInit, OnDestroy {
  numItems = 30;

  destroyed = new Subject();

  doRenderChunked = new Subject<string>();
  doRenderBlocking = new Subject<string>();

  items = Array.from(Array(this.numItems).keys()).map(() => Math.random());

  private strategies;

  constructor(private cdRef: ChangeDetectorRef) {
    super();
    this.set({ self: this });
  }

  ngOnInit() {
    this.strategies = getGlobalRenderingStrategies({ cdRef: this.cdRef });
    const blockingStrategy = this.strategies.blocking;
    const chunkStrategy = this.strategies.chunk;
    this.hold(
      this.doRenderBlocking.pipe(
        tap(() => this.updateItems()),
        blockingStrategy.rxScheduleCD
      ),
      () => {
        //console.log('rendered', this);
      }
    );
    this.hold(
      this.doRenderChunked.pipe(
        tap(() => this.updateItems()),
        chunkStrategy.rxScheduleCD
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

  private updateItems(): void {
    this.items = Array.from(Array(this.numItems).keys()).map(() =>
      Math.random()
    );
  }
}
