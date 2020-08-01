import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StrategiesSetupService } from '@rx-angular/template';

@Component({
  selector: 'rx-angular-strategies-setup-test',
  templateUrl: './strategies-setup-test.component.html',
  styleUrls: ['./strategies-setup-test.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StrategiesSetupService],
})
export class StrategiesSetupTestComponent implements OnInit {
  strategies = ['global', 'local', 'native', 'noop', 'detach'];
  changeDetections = 0;
  currentStrategy: string;
  detectedChanges = () => {
    return ++this.changeDetections;
  };
  constructor(private setupService: StrategiesSetupService) {
    this.setupService.strategy$.subscribe((s) => (this.currentStrategy = s));
  }

  ngOnInit(): void {}

  changeStrategy(s) {
    this.setupService.setStrategy(s);
  }
}
