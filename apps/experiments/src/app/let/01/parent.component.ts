import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { defer, Observable } from 'rxjs';
import { scan, startWith, tap } from 'rxjs/operators';

import { BaseComponent } from '../../base.component.ts/base.component';
import { fromZoneEvent } from '@ngx-rx/core';

@Component({
  selector: 'app-let-parent01',
  template: `
    <h2>
      Let Directive 01
      <small
        >One single-shot observable bound by one rxLet as input binding with as
        syntax</small
      >
    </h2>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />: strategy
    <br />
    <button #button>increment</button>
    <ng-container *rxLet="value$ as v; let w">
      Value: {{ v }} {{ w }}
    </ng-container>
  `,
  changeDetection: environment.changeDetection
})
export class LetParent01Component extends BaseComponent {
  @ViewChild('button') button: ElementRef<HTMLButtonElement>;
  btnClick$ = defer(() => fromZoneEvent(this.button.nativeElement, 'click'));

  value$: Observable<number> = this.btnClick$.pipe(
    tap(console.log),
    startWith(0),
    scan((a): any => ++a, 0)
  );
}
