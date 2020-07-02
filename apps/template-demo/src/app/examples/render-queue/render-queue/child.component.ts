import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { getStrategies } from '@rx-angular/template';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  doRender = new Subject();

  items = Array.from(Array(10).keys()).map(() => Math.random());

  constructor(private cdRef: ChangeDetectorRef) {
    super();
    this.set({ self: this });
  }

  ngOnInit() {
    const strategy = getStrategies({ cdRef: this.cdRef }).localBlocking;
    this.hold(
      this.doRender.pipe(
        tap(
          () =>
            (this.items = Array.from(Array(100).keys()).map(() =>
              Math.random()
            ))
        ),
        strategy.behavior
      ),
      () => {
        // console.log('rendered', this);
      }
    );
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.destroyed.complete();
  }

  render() {
    return this.renderings++;
  }
}
