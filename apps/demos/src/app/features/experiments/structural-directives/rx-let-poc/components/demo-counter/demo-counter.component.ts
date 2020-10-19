import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { environment } from 'apps/demos/src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rxa-demo-counter',
  templateUrl: './demo-counter.component.html',
  host: {
    class: 'm-1 p-1',
    style: 'display: block;',
  },
  changeDetection: environment.changeDetection,
})
export class DemoCounterComponent {
  @Input() defaultStrategy;
  @Input() index = 0;
  counter$ = new BehaviorSubject<number>(0);
  strategies = ['global', 'local', 'native', 'noop', 'detach'];
  constructor() {}
  increment() {
    this.counter$.next(this.counter$.getValue() + 1);
  }
}
