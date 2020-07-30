import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rx-angular-demo-counter',
  templateUrl: './demo-counter.component.html',
  styleUrls: ['./demo-counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoCounterComponent {
  counter$ = new BehaviorSubject<number>(0);
  changeDetections = 0;
  detectedChanges = () => {
    return ++this.changeDetections;
  };
  constructor() {}
  increment() {
    this.counter$.next(this.counter$.getValue() + 1);
  }
}
