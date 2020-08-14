import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-cd06-child02-push',
  template: `
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
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
export class Child0602Component extends BaseComponent {}
