import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StrategySetupService } from '@rx-angular/template';

@Component({
  selector: 'rx-angular-demo-counter',
  templateUrl: './demo-counter.component.html',
  styleUrls: ['./demo-counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StrategySetupService],
})
export class DemoCounterComponent {
  @Input() set defaultStrategy(s) {
    this.setupService.strategy = s;
    this.currentStrategy = s;
  }
  @Input() index = 0;
  counter$ = new BehaviorSubject<number>(0);
  changeDetections = 0;
  strategies = ['global', 'local', 'native', 'noop', 'detach'];
  currentStrategy: string;
  detectedChanges = () => {
    return ++this.changeDetections;
  };
  constructor(private setupService: StrategySetupService) {
    this.setupService.strategy$.subscribe((s) => (this.currentStrategy = s));
  }
  increment() {
    this.counter$.next(this.counter$.getValue() + 1);
  }
  changeStrategy(s) {
    this.setupService.strategy = s;
  }
}
