import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'rxa-bootstrap-async-pipe',
  template: `<p>{{ text$ | async }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BootstrapAsyncPipeComponent implements AfterViewInit {
  text$;
  constructor() {
    this.text$ = of('Async pipe value');

    performance.mark('#asyncPipeBootstrap');
  }

  ngAfterViewInit() {
    performance.mark('#asyncPipeReady');
  }
}
