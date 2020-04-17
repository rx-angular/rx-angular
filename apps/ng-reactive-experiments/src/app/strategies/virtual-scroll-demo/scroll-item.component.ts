import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { CdConfigService } from '../../cd-config.service';

@Component({
  selector: 'ngx-rx-scroll-item',
  styleUrls: ['scroll-item.component.scss'],
  template: `
    <ng-content></ng-content><span style="margin: 0 1rem;">Val: {{ val$ | ngrxPush: strategy }}</span><span>Rendered by: {{ strategy }}</span>
  `,
})
export class ScrollItemComponent {

  // this can be ANY value from ANY service which causes re-rendering
  readonly val$ = interval(1000);

  readonly strategy = this.cdConfig.getConfig('strategy');

  constructor(
    private cdConfig: CdConfigService
  ) {

  }

}
