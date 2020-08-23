import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { concat, defer, fromEvent, NEVER, Observable, Subject } from 'rxjs';
import { scan, startWith, switchMap } from 'rxjs/operators';
import { CdConfigService } from '../../cd-config.service';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-push-parent01',
  template: `
    <h2>
      Push Pipe 01
      <small
        >one single-shot observable bound by one push as template
        expression</small
      >
    </h2>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <span>strategy: </span><b class="strategy">{{ strategy }}</b>
    <br />
    <button #button>increment</button>
    <!-- -->
    <br />
    Value1: {{ value1$ | push: strategy }}
  `,
  changeDetection: environment.changeDetection,
})
export class Parent01Component extends BaseComponent {
  @ViewChild('button') button: ElementRef<HTMLButtonElement>;
  btnClick$ = defer(() => fromEvent(this.button.nativeElement, 'click'));

  value1$: Observable<number> = this.afterViewInit$
    .pipe(switchMap(() => fromEvent(this.button.nativeElement, 'click')))
    .pipe(
      startWith(0),
      scan((a): any => ++a, 0)
    );
}
