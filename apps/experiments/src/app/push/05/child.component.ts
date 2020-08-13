import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseComponent } from '../../base.component.ts/base.component';
import { defer, fromEvent } from 'rxjs';

@Component({
  selector: 'app-push-child05',
  template: `
    <h3>Push Pipe Child 05</h3>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    Passed input binding: {{ value }}
    <!-- -->
  `,
  changeDetection: environment.changeDetection,
})
export class Child05Component extends BaseComponent {
  @Input()
  value;
}
