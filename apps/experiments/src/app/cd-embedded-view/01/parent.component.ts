import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { range, Subject } from 'rxjs';
import { getStrategies } from '@rx-angular/template';
import { switchMap, tap } from 'rxjs/operators';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-cd-embedded-view-parent01',
  template: `
    <h2>
      CD EmbeddedView 01
    </h2>

    value$: {{ value$ | async }}
  `,
  changeDetection: environment.changeDetection,
})
export class CdEmbeddedViewParent01Component extends BaseComponent {
  btnClick$ = new Subject<Event>();

  cfg = { cdRef: this.cdRef };
  strategies = getStrategies(this.cfg);

  value$ = this.btnClick$.pipe(

  );
}
