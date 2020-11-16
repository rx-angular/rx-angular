import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'rxa-bootstrap-let-directive',
  template: `<p *rxLet="text$; let text">{{ text }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BootstrapLetDirectiveComponent implements AfterViewInit {
  text$;
  constructor() {
    this.text$ = of('Let directive value');

    performance.mark('#letDirectiveBootstrap');
  }

  ngAfterViewInit() {
    performance.mark('#letDirectiveReady');
  }
}
