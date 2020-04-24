import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { defer, from, Observable, Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';
import { CdConfigService } from '../../cd-config.service';
import { BaseComponent } from '../../base.component.ts/base.component';
import { fromZoneEvent } from '@rx-angular/template';

@Component({
  selector: 'app-let-parent11',
  template: `
    <h2>
      Let Directive 11
      <small
        >One single-shot observable bound by one rxLet as input binding with let
        syntax</small
      >
    </h2>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <span>strategy: </span><b class="strategy">{{ strategy }}</b>
    <br />
    <button #button>increment</button>
    <ng-container *rxLet="value$; let v">Value: {{ v }}</ng-container>
  `,
  changeDetection: environment.changeDetection
})
export class LetParent11Component extends BaseComponent {
  @ViewChild('button') button: ElementRef<HTMLButtonElement>;
  btnClick$ = defer(() => fromZoneEvent(this.button.nativeElement, 'click'));

  value$: Observable<number> = this.btnClick$.pipe(
    startWith(0),
    scan((a): any => ++a, 0)
  );
}
