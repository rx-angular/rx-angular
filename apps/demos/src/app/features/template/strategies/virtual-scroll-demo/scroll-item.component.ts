import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfigService } from '../../../../app-config.service';

@Component({
  selector: 'rxa-scroll-item',
  styles: [`:host {
    display: flex;
    align-items: center;
    height: 50px;
    outline: 1px solid gray;
    padding: 1rem;
  }`],
  template: `
    <span style="margin: 0 1rem;">Val: {{ val$ | push: strategy$ }}</span>
  `,
})
export class ScrollItemComponent {
  // this can be ANY value from ANY service which causes re-rendering
  readonly val$ = interval(1000);

  readonly strategy$ = this.cdConfig.$.pipe(map((s) => s.strategy));

  constructor(private cdConfig: AppConfigService) {}
}
