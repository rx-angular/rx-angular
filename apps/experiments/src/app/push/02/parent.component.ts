import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import { defer, fromEvent, Observable, Subject } from 'rxjs';
import { scan, startWith, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { CdConfigService } from '../../cd-config.service';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-push-parent02',
  template: `
    <h2>
      Push Pipe 02
      <small
        >one single-shot observable bound by multiple push as template
        expression</small
      >
    </h2>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <span>strategy: </span><b class="strategy">{{ strategy }}</b>
    <br />
    <button #button>increment</button>
    <!-- -->
    Value1: {{ value1$ | push: strategy }} Value1:
    {{ value1$ | push: strategy }} Value1:
    {{ value1$ | push: strategy }}
    <br />
  `,
  changeDetection: environment.changeDetection,
})
export class Parent02Component extends BaseComponent {
  @ViewChild('button') button: ElementRef<HTMLButtonElement>;
  btnClick$ = defer(() => fromEvent(this.button.nativeElement, 'click'));

  value1$: Observable<number> = this.afterViewInit$.pipe(
    switchMap(() => fromEvent(this.button.nativeElement, 'click')),
    startWith(0),
    scan((a): any => ++a, 0)
  );
}
