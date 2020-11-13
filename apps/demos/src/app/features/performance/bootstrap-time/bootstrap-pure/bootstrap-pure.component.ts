import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'rxa-bootstrap-pure',
  template: `<p>{{ text }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BootstrapPureComponent implements AfterViewInit {
  text;
  observer: PerformanceObserver;
  observer2: PerformanceObserver;
  constructor() {
    this.text = 'No service';
    performance.mark('Pure Component Bootstrap');
  }

  ngAfterViewInit() {
    performance.mark('Pure Component Ready');
    performance.measure(
      '#pureComponent',
      'Pure Component Bootstrap',
      'Pure Component Ready'
    );
  }
}
