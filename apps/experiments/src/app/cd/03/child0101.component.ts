import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-cd03-child0101-push',
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Child030101Component extends BaseComponent {}
