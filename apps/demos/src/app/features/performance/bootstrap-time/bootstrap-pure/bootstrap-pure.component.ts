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
    performance.mark('#pureComponentBootstrap');
  }

  ngAfterViewInit() {
    performance.mark('#pureComponentReady');
  }
}
