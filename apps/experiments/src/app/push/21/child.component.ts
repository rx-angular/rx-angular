import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { defer, fromEvent, Observable, ReplaySubject } from 'rxjs';
import { CdConfigService } from '../../cd-config.service';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-push-child21',
  template: `
    <h3>Push Pipe Child 21</h3>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <span>strategy: </span><b class="strategy">{{ strategy }}</b
    ><br />
    Passed input binding: {{ value1$ | push: strategy }}
    <!-- -->
  `,
  changeDetection: environment.changeDetection,
})
export class Child21Component extends BaseComponent {
  value1Subject = new ReplaySubject<Observable<number>>(1);

  @Input()
  set value(value$: Observable<number>) {
    this.value1Subject.next(value$);
  }

  value1$ = this.value1Subject.pipe();
}
