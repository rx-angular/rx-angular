import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CdConfigService } from '../../cd-config.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-rx-scroll-item',
  styleUrls: ['scroll-item.component.scss'],
  template: `
    <ng-content></ng-content><span class="margin-left: 10px">Renderings: {{ rerender() }}</span><span style="margin: 0 1rem;">Val: {{ val$ | ngrxPush: strategy$ }}</span><span>Rendered by: {{ strategy$ | ngrxPush }}</span>
  `,
  changeDetection: environment.changeDetection
})
export class ScrollItemComponent {

  // this can be ANY value from ANY service which causes re-rendering
  readonly val$ = interval(2500);

  private numRender = 0;

  readonly strategy$ = this.cdConfig.$.pipe(map(s => s.strategy));

  constructor(
    private cdConfig: CdConfigService
  ) {

  }

  rerender() {
    return ++this.numRender;
  }

}
