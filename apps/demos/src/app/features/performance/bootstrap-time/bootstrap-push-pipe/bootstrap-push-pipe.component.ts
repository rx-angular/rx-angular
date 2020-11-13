import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'rxa-bootstrap-push-pipe',
  template: `<p>{{ text$ | push }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BootstrapPushPipeComponent implements AfterViewInit {
  text$;
  constructor() {
    this.text$ = of('Push pipe value');

    performance.mark('Push Component Bootstrap');
  }

  ngAfterViewInit() {
    performance.mark('Push Component Ready');
    performance.measure(
      '#pushPipe',
      'Push Component Bootstrap',
      'Push Component Ready'
    );
  }
}
