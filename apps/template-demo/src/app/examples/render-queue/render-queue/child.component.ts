import { Component, OnDestroy, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { Renderable } from '../interfaces';

@Component({
  selector: 'rx-angular-child',
  template: `
    <p>
      {{ render() }}
    </p>
  `,
  styles: []
})
export class ChildComponent extends RxState<Renderable<ChildComponent>>
  implements OnDestroy {
  renderings = 0;

  destroyed = new Subject();

  constructor() {
    super();
    this.set({ self: this });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.destroyed.complete();
  }

  render() {
    return this.renderings++;
  }
}
