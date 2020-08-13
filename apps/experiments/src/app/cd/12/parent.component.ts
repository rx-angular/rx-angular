import { ChangeDetectionStrategy, Component } from '@angular/core';
import { defer, fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-cd-parent12',
  template: `
    <h2>
      CD 12
      <small>Observable subscription triggers zone</small>
    </h2>
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
      <span
        >dirty: <b class="dirty">{{ isMarkedDirty }}</b></span
      >
      <span
        >render: <b class="num-renders">{{ getNumOfRenderings() }}</b></span
      >
    </div>
    <div class="case-interaction">
      <button id="btn-cd12">Click over document.getElementById</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CdParent12Component extends BaseComponent {
  btnClick$ = defer(() =>
    fromEvent(document.getElementById('btn-cd12'), 'click')
  );

  baseEffects$ = this.btnClick$.pipe(
    tap((v) => console.log(v)),
    tap((_) => console.log('click over document.getElementById'))
  );
}
