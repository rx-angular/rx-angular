import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-cd03-child02-push',
  template: `
    <div class="case-info">
      <span>CD: <b class="cds">OnPush</b></span>
      <span
        >dirty: <b class="dirty">{{ isMarkedDirty }}</b></span
      >
      <span
        >render: <b class="num-renders">{{ getNumOfRenderings() }}</b></span
      >
    </div>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Child0302Component extends BaseComponent {}
