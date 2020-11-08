import { Component, ChangeDetectionStrategy } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'rxa-bootstrap-async-pipe',
  template: `<p>{{ text$ | async }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BootstrapAsyncPipeComponent {
  text$;
  constructor() {
    this.text$ = of('Async pipe value');
  }
}
