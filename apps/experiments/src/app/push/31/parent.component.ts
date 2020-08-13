import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { defer, fromEvent, Observable } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-push-parent31',
  template: `
    <h2>
      Push Pipe 31
      <small></small>
    </h2>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <span>strategy: </span><b class="strategy">{{ strategy }}</b>
    <br />
    <button #button>increment</button>
    <!-- -->
    <br />
    <app-insertion [template]="ref"></app-insertion>

    <ng-template #ref>
      <span>{{ value1$ | push }}</span>
    </ng-template>
  `,
  changeDetection: environment.changeDetection,
})
export class Parent31Component extends BaseComponent {
  @ViewChild('button') button: ElementRef<HTMLButtonElement>;
  btnClick$ = defer(() => fromEvent(this.button.nativeElement, 'click'));

  value1$: Observable<number> = this.btnClick$.pipe(
    startWith(0),
    scan((a): any => ++a, 0)
  );

  baseEffects$ = this.value1$;
}
