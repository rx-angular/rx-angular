import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseComponent } from '../../base.component.ts/base.component';
import { defer, fromEvent } from 'rxjs';

@Component({
  selector: 'app-push-child11',
  template: `
    <h3>Push Pipe Child 11</h3>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    Passed input binding: {{ value }}
    <!-- -->
  `,
  changeDetection: environment.changeDetection,
})
export class Child11Component extends BaseComponent {
  @Input()
  value;
}
