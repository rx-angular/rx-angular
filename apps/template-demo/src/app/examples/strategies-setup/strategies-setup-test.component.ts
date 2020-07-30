import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StrategySetupService } from '@rx-angular/template';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rx-angular-strategies-setup-test',
  templateUrl: './strategies-setup-test.component.html',
  styleUrls: ['./strategies-setup-test.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StrategySetupService],
})
export class StrategiesSetupTestComponent implements OnInit {
  strategies = ['global', 'local', 'native', 'noop', 'detach'];
  changeDetections = 0;
  currentStrategy: string;
  detectedChanges = () => {
    return ++this.changeDetections;
  };
  constructor(private setupService: StrategySetupService) {
    this.setupService.strategy$.subscribe((s) => (this.currentStrategy = s));
  }

  ngOnInit(): void {}

  changeStrategy(s) {
    this.setupService.strategy = s;
  }
}
