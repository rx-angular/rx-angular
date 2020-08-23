import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { getStrategies } from '@rx-angular/template';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Renderable } from '../interfaces';

@Component({
  selector: 'rx-angular-child2',
  template: `
    <mat-list>
      <mat-list-item *ngFor="let item of items">
        {{ item }} Lorem ipsum dolor
      </mat-list-item>
    </mat-list>
  `,
  styles: []
})
export class Child2Component extends RxState<Renderable<Child2Component>>
  implements OnInit, OnDestroy {
  renderings = 0;

  destroyed = new Subject();

  doRender = new Subject();

  items = Array.from(Array(1000).keys()).map(() => Math.random());

  constructor(private cdRef: ChangeDetectorRef) {
    super();
    this.set({ self: this });
  }

  ngOnInit() {
    const strategy = getStrategies({ cdRef: this.cdRef }).localSmooth;
    this.hold(
      this.doRender.pipe(
        tap(
          () =>
            (this.items = Array.from(Array(1000).keys()).map(() =>
              Math.random()
            ))
        ),
        strategy.rxScheduleCD
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
